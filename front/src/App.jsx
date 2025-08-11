import "./App.css";
import Persons from "./Persons";
import { useQuery } from "@apollo/client";
import { ALL_PERSONS } from "./persons/graphql-queries";
import { useState } from "react";
import PersonForm from "./PersonForm";
import Notify from "./Notify";
import PhoneForm from "./PhoneForm";

function App() {
  const { data, error, loading } = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null);

  if (error) return <p>Error {error}</p>;

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  return (
    <>
      <div>
        <h1>GraphQL</h1>
        <Notify errorMessage={errorMessage} />
        {loading && <p>Loading...</p>}
        {data && <Persons persons={data.allPersons} />}
        <PersonForm notifyError={notifyError} />
        <PhoneForm />
      </div>
    </>
  );
}

export default App;
