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
git clone https://github.com/tu-usuario/tu-repo.git
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
npm run dev
```

Esto abrirá la app en:

```
http://localhost:5173
```

---

## 📁 Estructura básica

```
src/
│
├── components/
│   ├── Estadisticas.vue      # Vista con gráficos
│   └── Home.vue              # Página de bienvenida
│
├── apollo.js                 # Configuración del cliente Apollo
├── graphql/queries.js        # Consultas GraphQL usadas en el frontend
├── App.vue                   # Layout principal
└── main.js                   # Punto de entrada de la app
```

---

## 📊 Funcionalidades

- Gráfico de ventas totales por **mes** en dinero (`$`)
- Gráfico de ventas por **producto** (cantidad)
- Conexión en tiempo real a un backend con GraphQL (Django)
- Estilo limpio y responsivo

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
