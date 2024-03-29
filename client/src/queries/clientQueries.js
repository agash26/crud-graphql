import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getAllClients {
    clients {
      name
      email
      phone
      id
    }
  }
`;

export { GET_CLIENTS };
