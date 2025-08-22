import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from "@apollo/client";

import {WebSocketLink} from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const getAuth = () => {
  const token = localStorage.getItem("phonenumbers-user-token");
  return token ? `bearer ${token}` : null;
};

const authLink = new HttpLink({
    headers: {
      authorization: getAuth(),
    },
    uri: "http://localhost:4000",
}),


const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options:{
    reconnect:true
  }
})

const splitLink = split(({query}) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  )
}, wsLink, authLink.concat(HttpLink))

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
