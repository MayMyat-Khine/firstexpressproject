import swaggerJSDoc from "swagger-jsdoc";
import { productPaths } from "./paths/product.swagger.mjs";
import { authPaths } from "./paths/auth.swagger.mjs";
import { branchPaths } from "./paths/branch.swagger.mjs";
import { customerPaths } from "./paths/customer.swagger.mjs";
import { orderPaths } from "./paths/order.swagger.mjs";
import { rolePaths } from "./paths/role.swagger.mjs";
import { stockPaths } from "./paths/stock.swagger.mjs";
import { transferStockPaths } from "./paths/transfer_stock.swagger.mjs";
import { userPaths } from "./paths/user.swagger.mjs";
import { permissionPaths } from "./paths/permission.swagger.mjs";
import { cartPaths } from "./paths/cart.swagger.mjs";
import { ProductCreateRequestSchema, ProductSchema, ProductUpdateRequestSchema } from "./schemas/product.schema.mjs";
import { CustomerAuthResponseSchema, CustomerLoginRequestSchema, RefreshTokenRequestSchema, UserAuthResponseSchema, UserLoginRequestSchema } from "./schemas/auth.schema.mjs";
import { BranchCreateRequestSchema, BranchSchema, BranchUpdateRequestSchema } from "./schemas/branch.schema.mjs";
import { CustomerCreateRequestSchema, CustomerSchema } from "./schemas/customer.schema.mjs";
import { OrderCreateRequestSchema, OrderSchema, OrderUpdateRequestSchema } from "./schemas/order.schema.mjs";
import { RoleCreateRequestSchema, RoleSchema, RoleUpdateRequestSchema } from "./schemas/role.schema.mjs";
import { StockSchema, StockUpdateRequestSchema } from "./schemas/stock.schema.mjs";
import { TransferStockCreateRequestSchema, TransferStockSchema } from "./schemas/transfer_stock.schema.mjs";
import { UserCreateRequestSchema, UserSchema, UserUpdateRequestSchema } from "./schemas/user.schema.mjs";
import { PermissionSchema } from "./schemas/permission.schema.mjs";
import { CartCreateRequestSchema, CartItemSchema, CartSchema } from "./schemas/cart.schema.mjs";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "POS Backend API",
            version: "1.0.0",
            description: "API Documentation"
        },
        servers: [
            {
                url: "https://retailexpress.onrender.com"
            }
        ],
        paths: {
            ...productPaths,
            ...authPaths,
            ...branchPaths,
            ...customerPaths,
            ...orderPaths,
            ...rolePaths,
            ...stockPaths,
            ...transferStockPaths,
            ...userPaths,
            ...permissionPaths,
            ...cartPaths
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                Product: ProductSchema,
                ProductCreateRequest: ProductCreateRequestSchema,
                ProductUpdateRequest: ProductUpdateRequestSchema,
                CustomerLoginRequest: CustomerLoginRequestSchema,
                UserLoginRequest: UserLoginRequestSchema,
                RefreshTokenRequest: RefreshTokenRequestSchema,
                CustomerAuthResponse: CustomerAuthResponseSchema,
                UserAuthResponse: UserAuthResponseSchema,
                Branch: BranchSchema,
                BranchCreateRequest: BranchCreateRequestSchema,
                BranchUpdateRequest: BranchUpdateRequestSchema,
                Customer: CustomerSchema,
                CustomerCreateRequest: CustomerCreateRequestSchema,
                Order: OrderSchema,
                OrderCreateRequest: OrderCreateRequestSchema,
                OrderUpdateRequest: OrderUpdateRequestSchema,
                Role: RoleSchema,
                RoleCreateRequest: RoleCreateRequestSchema,
                RoleUpdateRequest: RoleUpdateRequestSchema,
                Stock: StockSchema,
                StockUpdateRequest: StockUpdateRequestSchema,
                TransferStock: TransferStockSchema,
                TransferStockCreateRequest: TransferStockCreateRequestSchema,
                User: UserSchema,
                UserCreateRequest: UserCreateRequestSchema,
                UserUpdateRequest: UserUpdateRequestSchema,
                Permission: PermissionSchema,
                CartItem: CartItemSchema,
                Cart: CartSchema,
                CartCreateRequest: CartCreateRequestSchema
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },

    apis: [
        // "./src/routes/*.mjs"
    ]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;