import { createRouter, createWebHistory } from "vue-router";
import Estadisticas from "@/components/Estadisticas/Estadisticas.vue";
import Ventas from "@/components/Ventas/Ventas.vue";
import Dashboard from "@/components/Dashboard/Dashboard.vue";
import Home from "@/components/Home/Home.vue";

const routes = [
  { path: "/", name: "AppHome", component: Home },
  { path: "/dashboard", name: "AppDashboard", component: Dashboard },
  { path: "/ventas", name: "AppVentas", component: Ventas },
  { path: "/estadisticas", name: "AppEstadisticas", component: Estadisticas },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
