import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql",
  credentials: "include", // 🔥 esto es clave para enviar cookies
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
