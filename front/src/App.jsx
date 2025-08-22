import "./App.css";
import Persons from "./Persons";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_PERSONS } from "./persons/graphql-queries";
import { useState } from "react";
import PersonForm from "./PersonForm";
import Notify from "./Notify";
import PhoneForm from "./PhoneForm";
import LoginForm from "./LoginForm";
import { PERSON_ADDED } from "./persons/graphql-subscriptions";

function App() {
  const { data, error, loading } = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem("phonenumbers-user-token")
  );
  const client = useApolloClient();

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { addedPerson } = subscriptionData.data;

      const dataInStore = store.readQuery({ query: ALL_PERSONS });
      client.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, response.data.allPerson],
        },
      });
    },
  });

  if (error) return <p>Error {error}</p>;

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <>
      <div>
        <h1>GraphQL</h1>
        <Notify errorMessage={errorMessage} />
        {loading && <p>Loading...</p>}
        {data && <Persons persons={data.allPersons} />}
        {token ? (
          <button onClick={logout}>Cerrar sesión</button>
        ) : (
          <LoginForm notifyError={notifyError} setToken={setToken} />
        )}
        <PersonForm notifyError={notifyError} />
        <PhoneForm />
      </div>
    </>
  );
}

export default App;
