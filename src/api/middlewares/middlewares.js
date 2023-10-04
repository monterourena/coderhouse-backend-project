import customResponses from './custom-responses.middleware.js'
import routingPolicies from './routing-policies.middleware.js'
import multerAny from './multer.middleware.js'
import { updateDeleteProductPolicy } from './products.middleware.js'

export const Middlewares = {
    customResponses,
    routingPolicies,
    multerAny,
    updateDeleteProductPolicy
}