<template>
  <div>
    <div class="tarjeta">
      <div class="text-container">
        <h4>{{ titulo }}</h4>
        <span>{{ emogi }}</span>
      </div>

      <h1>{{ valor }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppTarjeta",
  props: {
    valor: {
      type: String,
      default: "",
    },
    titulo: {
      type: String,
      default: "",
    },
    emogi: {
      type: String,
      default: "",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tarjeta {
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  padding: 30px;
  margin: 10px;
}
.text-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20p;
}
</style>
