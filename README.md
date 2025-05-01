# 📊 Panel de Estadísticas de Ventas

Este proyecto es un frontend en **Vue 3** con **Apollo Client** para consumir una API GraphQL desde un backend en Django. Visualiza estadísticas de ventas por producto y por mes usando gráficos interactivos de ApexCharts.

---

## 🚀 Requisitos

- Node.js v16+ o superior
- npm o yarn
- Backend GraphQL activo (por ejemplo, `http://localhost:8000/graphql`)

---

## 📦 Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/Papo001x/PruebaTecnicaRecuFront.git
cd tu-repo
npm install
```

> O usa `yarn` si lo prefieres:
> ```bash
> yarn install
> ```

---

## 🔧 Configuración del cliente Apollo

El cliente Apollo está configurado por defecto para apuntar a:

```
http://localhost:8000/graphql
```

Si tu backend usa otro puerto o URL, edita el archivo `src/apollo.js`:

```js
const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
  credentials: "include",
});
```

---

## 🖥️ Ejecutar la aplicación

```bash
vue serve
```

Esto abrirá la app en:

```
http://localhost:8080/
```

---



## ✅ Autor

Desarrollado por **Brandon** como parte de una prueba técnica.

---

## 🧪 ¿Problemas?

Asegúrate de que:

- El backend Django está corriendo correctamente y responde en `/graphql`
- El CORS está habilitado en el backend (si frontend y backend están en puertos diferentes)
- La versión de Node.js es compatible

---

¡Gracias por revisar este proyecto! 🎉
