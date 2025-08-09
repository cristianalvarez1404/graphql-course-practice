import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import PersonForm from "./PersonForm";

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  const [person, setPerson] = useState(null);

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street}</div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    );
  }

  if (!persons) return null;

  return (
    <div>
      <h1>Persons</h1>
      {persons.map((p) => (
        <div
          key={p.id}
          onClick={() => {
            showPerson(p.name);
          }}
          style={{
            backgroundColor: "green",
            marginBottom: "2rem",
            color: "white",
            cursor: "pointer",
          }}
        >
          {p.name}
          {p.phone}
        </div>
      ))}
      <PersonForm />
    </div>
  );
};

export default Persons;
