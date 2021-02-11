# AC32006-Databases / GraphQL API Example

This is a project made for University of Dundee AC32006 Databases module. This repo is split into 2 components, `web` and `server`. These components form a modern [Jam Stack](https://jamstack.org/). Each component contains its own readme file documenting how to use it and basic configuration needed.  

Documents made for this assignment such as the MySQL Workbench files can be found in the `Documents` folder.

### Technology used for web frontend
- React
- Next.js
- React Bootstrap
- Axios
- Apollo Client

### Technology used for server
- GraphQL
- Apollo server
- Objection.js
- MySQL
- Express

The GraphQL server is implemented using [Apollo Server](https://www.apollographql.com/), and NodeJS GraphQL implementation.

Each set of scheme and accompanying resolvers are split into their own files and then there's a schema.js file that imports and form the final gql scheme used for the API. Schemas can be split into as many files as needed and one scheme can use/access types defined in another file, regardless of order in which schemas are imported into the final schema.

*A version of this system also exists implements pure MongoDB in place of a MySQL & Objection.js ORM  [Here](https://github.com/maxwillkelly/Agile-Coursework) (This was for another module, hence end product is different)*

**Note for Dundee Students:** Please do not reuse this code for the databases assignment, This technology stack was not taught by the University and was used by this group due to our better familiarity with NodeJS and GraphQL over the intended bare php server provided. If you are wanting to learn this stack, here's some recommended reading first before you look at the code, along with knowing basic JavaScript.

- [Into to GraphQL](https://graphql.org/learn/)
- [Apollo Server Documenation](https://www.apollographql.com/docs/apollo-server/)
- [Creating a Next.js app](https://nextjs.org/learn/basics/create-nextjs-app?utm_source=next-site&utm_medium=homepage-cta&utm_campaign=next-website)
- [Getting Started with React](https://reactjs.org/docs/getting-started.html)
