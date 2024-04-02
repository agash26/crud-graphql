import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
      status
      description
      client {
        name
        email
      }
    }
  }
`;

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $status: ProjectStatus!
    $description: String!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      status: $status
      description: $description
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        name
        email
      }
    }
  }
`;

const EDIT_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $name: String!
    $status: ProjectStatusUpdate!
    $description: String!
    $clientId: ID!
  ) {
    updateProject(
      id: $id
      name: $name
      status: $status
      description: $description
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        name
        email
      }
    }
  }
`;

export { DELETE_PROJECT, ADD_PROJECT, EDIT_PROJECT };
