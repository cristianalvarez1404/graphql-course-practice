import { ApolloServer, UserInputError, gql } from "apollo-server";
import { v1 as uuid } from "uuid";
import axios from "axios";
import "./db.js";
import Person from "./models/person.js";

let persons = [
  {
    name: "person1",
    phone: "123",
    street: "cr 123",
    city: "city 1",
    id: "1",
  },
  {
    name: "person2",
    phone: "1233",
    street: "cr 1233",
    city: "city 2",
    id: "2",
  },
  {
    name: "person3",
    street: "cr 1234",
    city: "city 3",
    id: "3",
  },
];

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(name: String!, phone: String!): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: async (root, args) => {
      const { data: personsFromRestApi } = await axios.get(
        "http://localhost:3000/persons"
      );

      if (!args.phone) return personsFromRestApi;

      return personsFromRestApi.filter((p) =>
        args.phone === "YES" ? p.phone : !p.phone
      );
    },
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.some((p) => p.name === args.name)) {
        return new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }

      const person = { ...args, id: uuid() };
      persons.push(person);
      return person;
    },
    editNumber: (root, args) => {
      const index = persons.findIndex((t) => t.name === args.name);
      if (index === -1) {
        return null;
      }

      const person = persons[index];

      const newPhone = { ...person, phone: args.phone };
      persons[index] = newPhone;

      return newPhone;
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(url);
});
