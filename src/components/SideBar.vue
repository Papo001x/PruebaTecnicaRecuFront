<template>
  <div :class="isOpen ? 'side-bar' : 'side-bar-hidden'">
    <header v-if="isOpen" class="header-side-bar-hiddden">
      <div class="button-close" @click="isOpen = !isOpen" title="Cerrar">
        ❌
      </div>
      <h1 class="title-side-bar">Panel de control</h1>
    </header>
    <header v-else class="header-side-bar">
      <div class="button-open" @click="isOpen = !isOpen" title="Abrir">🔧</div>
    </header>
    <section>
      <router-link to="/dashboard" class="text-link"
        ><h3 title="Dashboard">
          {{ isOpen ? "💡Dashboard" : "💡" }}
        </h3></router-link
      >
      <router-link to="/ventas" class="text-link"
        ><h3 title="Ventas">{{ isOpen ? "💰 Ventas" : "💰" }}</h3></router-link
      >
      <router-link to="/estadisticas" class="text-link"
        ><h3 title="Estadisticas">
          {{ isOpen ? "📈 Estadisticas" : "📈" }}
        </h3></router-link
      >
    </section>
    <footer>
      <router-link to="/" class="text-link"
        ><h3 title="Home">{{ isOpen ? "🏠 Home" : "🏠" }}</h3></router-link
      >
    </footer>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isOpen: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-side-bar-hiddden {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-side-bar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-side-bar-hiddden:hover .button-close {
  display: block;
}
.header-side-bar-hiddden:hover .button-close:hover {
  display: block;
  background-color: #111111 !important;
}
.button-close {
  background-color: black;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 20px;
  display: none;
}
.side-bar {
  background-color: black;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.side-bar-hidden {
  background-color: black;
  width: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h1 {
  margin: 0px;
}
.title-side-bar {
  padding: 40px;
  color: white;
}
.text-link {
  text-decoration: none;
  cursor: pointer;
  color: white;
}

h3 {
  padding: 20px;
  margin: 0px;
  color: white;
}
h3:hover {
  background-color: #111111 !important;
  font-size: 1.5rem;
}
.button-open {
  font-size: 1.5rem;
  cursor: pointer;
  padding: 20px;
}

.button-open:hover {
  font-size: 2rem;
  cursor: pointer;
  padding: 20px;
}
</style>
