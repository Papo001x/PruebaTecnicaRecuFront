<template>
  <section class="ventas">
    <h1>Tabla de ventas</h1>
    <h4>Listado de productos vendidos y cantidad de veces vendido.</h4>
    <AppTablaVentas class="tabla" :noResultadosPorPagina="15" />
  </section>
</template>

<script>
import AppTablaVentas from "../Shared/TablaVentas.vue"; // Asegúrate de importar el componente AppTablaVentas aquí

export default {
  name: "AppVentas",
  components: {
    AppTablaVentas, // Asegúrate de importar el componente AppTablaVentas aquí
    // Importar los componentes necesarios aquí
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ventas {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
.tabla {
  width: 100%;
}
h1 {
  margin: 20px 0 0 20px;
}
h4 {
  margin: 20px 0 0 20px;
}
</style>
