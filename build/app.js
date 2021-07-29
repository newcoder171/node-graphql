"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const graphql_tools_1 = require("graphql-tools");
const product_service_1 = require("./products/product.service");
const user_service_1 = require("./users/user.service");
const app = express_1.default();
const port = 3000;
let typeDefs = [`
  type Query {
    hello: String
  }
     
  type Mutation {
    hello(message: String) : String
  }
`];
let helloMessage = 'World!';
let resolvers = {
    Query: {
        hello: () => helloMessage
    },
    Mutation: {
        hello: (_, helloData) => {
            helloMessage = helloData.message;
            return helloMessage;
        }
    }
};
let productsService = new product_service_1.ProductsService();
let usersService = new user_service_1.UsersService();
typeDefs += productsService.configTypeDefs();
typeDefs += usersService.configTypeDefs();
productsService.configResolvers(resolvers);
usersService.configResolvers(resolvers);
app.use('/graphql', express_graphql_1.default({
    schema: graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true
}));
app.listen(port, () => console.log(`Node Graphql API listening on port ${port}!`));
