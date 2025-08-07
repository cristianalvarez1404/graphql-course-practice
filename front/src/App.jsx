import "./App.css";
import Persons from "./Persons";
import { gql, useQuery } from "@apollo/client";

const ALL_PERSONS = gql`
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

function App() {
  const { data, error, loading } = useQuery(ALL_PERSONS);

  if (error) return <p>Error {error}</p>;

  return (
    <>
      <div>
        <h1>GraphQL</h1>
        {loading && <p>Loading...</p>}
        {data && <Persons persons={data.allPersons} />}
      </div>
    </>
  );
}

export default App;
