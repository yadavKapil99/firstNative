import {getAllCategories} from '../controllers/product/category.js'
import {getProductByCategoryId} from '../controllers/product/product.js'

export const categoryRoutes = async (fastify, options) => {
    fastify.get('/categories', getAllCategories)
}

export const productyRoutes = async (fastify, options) => {
    fastify.get('/products/:categoryId', getProductByCategoryId)
}