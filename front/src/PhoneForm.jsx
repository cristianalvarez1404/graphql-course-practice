import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { EDIT_NUMBER } from "./persons/graphql-mutation";

const PhoneForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber] = useMutation(EDIT_NUMBER);

  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({ variables: { name, phone } });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Edit form number</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="phone"
        />
        <button type="submit">Change Phone</button>
      </form>
    </div>
  );
};

export default PhoneForm;
