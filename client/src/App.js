import { BrowserRouter } from "react-router-dom";
import Header from "./component/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./component/Clients";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header />
        <Clients />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
