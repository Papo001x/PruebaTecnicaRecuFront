<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import ApexChart from "vue3-apexcharts";
import { ref, watch, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

// Series del gráfico por mes
const series = ref([{ name: "Ventas", data: [] }]);
const chartOptions = ref({
  chart: { id: "ventas-line-chart" },
  xaxis: { categories: [] },
  dataLabels: { enabled: false },
  yaxis: {
    labels: {
      formatter: (val) => `$${Number(val).toLocaleString("es-CO")}`,
    },
  },
});

// Series del gráfico por producto
const productSeries = ref([{ name: "Cantidad Vendida", data: [] }]);
const productChartOptions = ref({
  chart: { id: "ventas-productos-chart" },
  xaxis: { categories: [] },
  dataLabels: { enabled: false },
  yaxis: {
    title: { text: "Unidades" },
  },
});

// Consulta GraphQL
const { result } = useQuery(gql`
  query {
    ventasTotalesPorMes {
      month
      totalSalesAmount
    }
    ventasTotalesPorProducto {
      product
      totalSales
    }
  }
`);

// Procesar si los datos ya están al montar
onMounted(() => {
  if (result.value && result.value.ventasTotalesPorMes) {
    cargarDatos(result.value);
  }
});

// Reaccionar si los datos llegan después
watch(result, (nuevoResultado) => {
  if (nuevoResultado && nuevoResultado.ventasTotalesPorMes) {
    cargarDatos(nuevoResultado);
  }
});

// Carga y formatea datos para ambos gráficos
function cargarDatos(data) {
  // Gráfico por mes
  const datosMes = data.ventasTotalesPorMes;
  const ventas = datosMes.map((item) => parseFloat(item.totalSalesAmount));
  const categorias = datosMes.map((item) => formatoMes(item.month));

  series.value = [{ name: "Ventas", data: ventas }];
  chartOptions.value.xaxis.categories = categorias;

  // Gráfico por producto
  const datosProducto = data.ventasTotalesPorProducto;
  const cantidades = datosProducto.map((item) => item.totalSales);
  const nombres = datosProducto.map((item) => item.product);

  productSeries.value = [{ name: "Cantidad Vendida", data: cantidades }];
  productChartOptions.value.xaxis.categories = nombres;
}

// Formatear mes: "2024-01" → "ene. 2024"
function formatoMes(isoMonth) {
  const date = new Date(isoMonth + "-01");
  return date.toLocaleString("es-ES", { month: "short", year: "numeric" });
}
</script>

<template>
  <div class="estadisticas">
    <h1>📈 Estadísticas de Ventas</h1>

    <div v-if="series[0].data.length === 0">⏳ Cargando datos...</div>
    <div v-else class="estadisticas-graficos">
      <!-- Gráfico de ventas por mes -->
      <div class="grafico">
        <h4>Ventas totales por mes</h4>
        <component
          :is="ApexChart"
          width="500px"
          height="500"
          type="bar"
          :options="chartOptions"
          :series="series"
        />
      </div>
      <div class="grafico">
        <h4 style="margin-top: 60px">Ventas por producto</h4>
        <component
          :is="ApexChart"
          width="600px"
          height="500"
          type="bar"
          :options="productChartOptions"
          :series="productSeries"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.estadisticas {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.estadisticas-graficos {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.grafico {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
