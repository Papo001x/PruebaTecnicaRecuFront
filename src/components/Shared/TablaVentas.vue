<template>
  <div v-if="loading">Cargando ventas...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <div class="container-table">
      <table>
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              @click="toggleSort(header.key)"
              style="cursor: pointer"
            >
              {{ header.text }}
              <span v-if="sortKey === header.key">
                {{ sortOrder === "asc" ? "▲" : "▼" }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="venta in paginatedSales"
            :key="venta.date + venta.product.name"
          >
            <td>{{ venta.product.name }}</td>
            <td>{{ venta.quantity }}</td>
            <td>{{ venta.date }}</td>
            <td>${{ venta.product.price }}</td>
            <td>${{ venta.totalPrice }}</td>
          </tr>
        </tbody>
      </table>

      <div class="paginador">
        <h4
          @click="prevPage"
          :disabled="currentPage === 1"
          class="button-actions"
        >
          ← Anterior
        </h4>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <h4
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="button-actions"
        >
          Siguiente →
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const GET_ALL_SALES = gql`
  query {
    allSales {
      product {
        name
        price
      }
      quantity
      date
      totalPrice
    }
  }
`;

export default {
  name: "AppTablaVentas",
  props: {
    noResultadosPorPagina: {
      type: Number,
      default: 10,
    },
  },

  setup(props, { emit }) {
    const { result, loading, error } = useQuery(GET_ALL_SALES);

    const headers = [
      { text: "Producto", key: "product.name" },
      { text: "Cantidad", key: "quantity" },
      { text: "Fecha", key: "date" },
      { text: "Precio unitario", key: "product.price" },
      { text: "Total", key: "totalPrice" },
    ];

    const currentPage = ref(1);
    const sortKey = ref("date");
    const sortOrder = ref("asc");

    const getNestedValue = (obj, keyPath) => {
      return keyPath.split(".").reduce((val, key) => val?.[key], obj);
    };

    const sortedSales = computed(() => {
      if (!result.value) return [];
      return [...result.value.allSales].sort((a, b) => {
        const aVal = getNestedValue(a, sortKey.value);
        const bVal = getNestedValue(b, sortKey.value);
        if (aVal < bVal) return sortOrder.value === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder.value === "asc" ? 1 : -1;
        return 0;
      });
    });

    const paginatedSales = computed(() => {
      const start = (currentPage.value - 1) * props.noResultadosPorPagina;
      const end = start + props.noResultadosPorPagina;
      return sortedSales.value.slice(start, end);
    });

    const totalPages = computed(() => {
      if (!result.value) return 0;
      return Math.ceil(
        result.value.allSales.length / props.noResultadosPorPagina
      );
    });

    const totalVentas = computed(() => {
      if (!result.value) return 0;
      const total = result.value.allSales.reduce(
        (sum, v) => sum + v.totalPrice,
        0
      );
      return Number(total.toFixed(2));
    });

    const cantidadVentas = computed(() => {
      return result.value ? result.value.allSales.length : 0;
    });

    const mediaVentas = computed(() => {
      if (!result.value || result.value.allSales.length === 0) return 0;
      const sum = result.value.allSales.reduce(
        (acc, v) => acc + v.totalPrice,
        0
      );
      return Number((sum / result.value.allSales.length).toFixed(2));
    });

    const medianaVentas = computed(() => {
      if (!result.value || result.value.allSales.length === 0) return 0;
      const precios = result.value.allSales
        .map((v) => v.totalPrice)
        .sort((a, b) => a - b);
      const mitad = Math.floor(precios.length / 2);
      const mediana =
        precios.length % 2 === 0
          ? (precios[mitad - 1] + precios[mitad]) / 2
          : precios[mitad];
      return Number(mediana.toFixed(2));
    });

    const modaVentas = computed(() => {
      if (!result.value || result.value.allSales.length === 0) return 0;
      const conteo = {};
      result.value.allSales.forEach((v) => {
        const precio = v.totalPrice;
        conteo[precio] = (conteo[precio] || 0) + 1;
      });
      let maxFrecuencia = 0;
      let moda = null;
      for (const [precio, frecuencia] of Object.entries(conteo)) {
        if (frecuencia > maxFrecuencia) {
          maxFrecuencia = frecuencia;
          moda = precio;
        }
      }
      return Number(Number(moda).toFixed(2));
    });

    // Emitir datos al padre cuando cambian o al montar
    const emitirResumen = () => {
      emit("resumen-ventas", {
        monto: totalVentas.value,
        cantidad: cantidadVentas.value,
        media: mediaVentas.value,
        mediana: medianaVentas.value,
        moda: modaVentas.value,
      });
    };

    watch(
      [totalVentas, cantidadVentas, mediaVentas, medianaVentas, modaVentas],
      emitirResumen,
      { immediate: true }
    );

    onMounted(() => {
      emitirResumen();
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const toggleSort = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortKey.value = key;
        sortOrder.value = "asc";
      }
    };

    return {
      result,
      loading,
      error,
      headers,
      currentPage,
      totalPages,
      paginatedSales,
      totalVentas,
      nextPage,
      prevPage,
      sortKey,
      sortOrder,
      toggleSort,
    };
  },
};
</script>

<style scoped>
.container-table {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: end;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px 12px;
}
th {
  background-color: #f2f2f2;
}
.paginador {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
.button-actions {
  cursor: pointer;
  margin: 0px;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
