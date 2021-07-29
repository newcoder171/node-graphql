"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
class ProductsService {
    constructor() {
        this.products = ['productSample'];
    }
    configTypeDefs() {
        let typeDefs = `
          type Product {
            name: String,
            description: String,
            id: Int,
            price: Int
          } `;
        typeDefs += ` 
          extend type Query {
          products: [Product]
        }
        `;
        typeDefs += `
          extend type Mutation {
            product(name:String, id:Int, description: String, price: Int): Product!
          }`;
        return typeDefs;
    }
    configResolvers(resolvers) {
        resolvers.Query.products = () => {
            return this.products;
        };
        resolvers.Mutation.product = (_, product) => {
            this.products.push(product);
            return product;
        };
    }
}
exports.ProductsService = ProductsService;
