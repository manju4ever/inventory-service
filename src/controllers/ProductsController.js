import { products } from '~/persistence';

const ProductService = {

    addProducts:  (productList = []) => products.insert(productList),

    getAllProducts: (query = {}) => products.find(query).execAsync(),

    updateProduct: (product_id, payload) => products.update({
        _id: product_id,
    }, payload, {
        returnUpadtedDocs: true,
    }),
};

export default {
    addProducts: async (request, h) => h
        .response(await ProductService
                    .addProducts(request.payload)),
    updateProduct: async (request, h) => h
        .response(await ProductService
                    .updateProduct(request.params.product_id, request.payload)),
    getAllProducts: async (request, h) => h.response(await ProductService
                    .getAllProducts()),
}