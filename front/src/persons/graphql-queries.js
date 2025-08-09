import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
    }
  }
`;
