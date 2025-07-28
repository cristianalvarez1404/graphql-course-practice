import {ApolloServer, gql} from 'apollo-server'

const persons = [
    {
        name:"person1",
        phone:"123",
        street:"cr 123",
        city:"city 1",
        id:"1"
    },
    {
        name:"person2",
        phone:"1233",
        street:"cr 1233",
        city:"city 2",
        id:"2"
    },
    {
        name:"person3",
        street:"cr 1234",
        city:"city 3",
        id:"3"
    },    
]

const typeDefs = gql`
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
        allPersons: [Person]!
        findPerson(name:String!): Person
    }   
`

const resolvers = {
    Query: {
        personCount:() => persons.length,
        allPersons:() => persons,
        findPerson:(root,args) => {
            const { name } = args
            return persons.find(person => person.name === name)
        } 
    },
    Person: {
        address:(root) => {
            return {
                street:root.street,
                city:root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()
.then(({url}) => {console.log(url) })



