<template>
  <section class="dashboard">
    <div class="tarjetas">
      <AppTarjeta
        :valor="'$' + totalVentas.toFixed(2)"
        :titulo="'Total Ventas'"
        :emogi="'💰'"
      />
      <AppTarjeta
        :valor="cantidadVentas"
        :titulo="'Cantidad de ventas'"
        :emogi="'📊'"
      />
      <AppTarjeta
        :valor="'$' + mediaVentas.toFixed(2)"
        :titulo="'Media'"
        :emogi="'〽️'"
      />
      <AppTarjeta
        :valor="'$' + medianaVentas.toFixed(2)"
        :titulo="'Mediana'"
        :emogi="'🧮'"
      />
      <AppTarjeta
        :valor="'$' + modaVentas.toFixed(2)"
        :titulo="'Moda'"
        :emogi="'📈'"
      />
    </div>
    <div class="resumen-ventas">
      <h2>Resumen de ventas</h2>
      <AppTablaVentas
        class="tabla"
        :noResultadosPorPagina="5"
        @resumen-ventas="
          (resumen) => {
            totalVentas = resumen.monto;
            cantidadVentas = resumen.cantidad;
            mediaVentas = resumen.media;
            medianaVentas = resumen.mediana;
            modaVentas = resumen.moda;
          }
        "
      />
    </div>
  </section>
</template>

<script>
import AppTablaVentas from "../Shared/TablaVentas.vue";
import AppTarjeta from "../Shared/Tarjeta.vue";

export default {
  name: "AppDashboard",
  components: {
    AppTablaVentas,
    AppTarjeta,
  },
  data() {
    return {
      totalVentas: 0,
      cantidadVentas: 0,
      mediaVentas: 0,
      medianaVentas: 0,
      modaVentas: 0,
    };
  },
};
</script>

<style scoped>
.dashboard {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tickets {
  display: flex;
  gap: 1rem;
}
.resumen-ventas {
  width: 100%;
}
.tabla {
  width: 100%;
}
.tarjetas {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
