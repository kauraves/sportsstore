const express = require("express"); // This package will be used to host the back-end servers.
const jsonServer = require("json-server"); // This package will be used to provide a RESTful web service
const chokidar = require("chokidar"); // This package monitors files for changes
const cors = require("cors"); // This package is used to enable cross-origin request sharing (CORS) requests.
// GraphQL -->
const fs = require("fs");
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
const queryResolvers = require("./serverQueriesResolver");
const mutationResolvers = require("./serverMutationsResolver");
// <-- GraphQL

const fileName = process.argv[2] || "./data.js"
const port = process.argv[3] || 3500;

let router = undefined;
let graph = undefined; // GraphQL

const app = express();

const createServer = () => {
    delete require.cache[require.resolve(fileName)];
    setTimeout(() => {
        router = jsonServer.router(fileName.endsWith(".js") ? require(fileName)() : fileName);
        // GraphQL -->
        let schema =  fs.readFileSync("./serverQueriesSchema.graphql", "utf-8")
            + fs.readFileSync("./serverMutationsSchema.graphql", "utf-8");
        let resolvers = { ...queryResolvers, ...mutationResolvers };
        graph = graphqlHTTP({
            schema: buildSchema(schema), rootValue: resolvers, 
            graphiql: true, context: { db: router.db }
        }) // <-- GraphQL
    }, 100)
}

createServer();

app.use(cors());
app.use(jsonServer.bodyParser)
app.use("/api", (req, resp, next) => router(req, resp, next));
app.use("/graphql", (req, resp, next) => graph(req, resp, next));

chokidar.watch(fileName).on("change", () => {
    console.log("Reloading web service data...");
    createServer();
    console.log("Reloading web service data complete.");
});

app.listen(port, () => console.log(`Web service running on port ${port}`));