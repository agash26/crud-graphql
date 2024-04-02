import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getAllProjects {
    projects {
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

export { GET_PROJECTS };
