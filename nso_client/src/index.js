import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

// redux
import store from "./store";
import {setContext} from "@apollo/client/link/context";

// apollo client
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    </React.StrictMode>,
);
