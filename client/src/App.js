import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./component/Clients";
import AddClient from "./component/AddClient";
import AddProject from "./component/AddProject";
import Projects from "./component/Projects";
import EditProject from "./component/EditProject";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(exist, income) {
            return income;
          },
        },
        projects: {
          merge(exist, income) {
            return income;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header />
        <Routes>
          <Route path="/" element={<Clients />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/update-project/:projectId" element={<EditProject />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
