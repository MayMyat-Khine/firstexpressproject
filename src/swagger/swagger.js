import swaggerJSDoc from "swagger-jsdoc";
import { productPaths } from "./paths/product.swagger.js";
import { authPaths } from "./paths/auth.swagger.js";
import { branchPaths } from "./paths/branch.swagger.js";
import { customerPaths } from "./paths/customer.swagger.js";
import { orderPaths } from "./paths/order.swagger.js";
import { rolePaths } from "./paths/role.swagger.js";
import { stockPaths } from "./paths/stock.swagger.js";
import { transferStockPaths } from "./paths/transfer_stock.swagger.js";
import { userPaths } from "./paths/user.swagger.js";
import { permissionPaths } from "./paths/permission.swagger.js";
import { cartPaths } from "./paths/cart.swagger.js";
import { countryPaths } from "./paths/country.swagger.js";
import { currencyRatePaths } from "./paths/currency_rate.swagger.js";
import { categoryPaths } from "./paths/category.swagger.js";
import { brandPaths } from "./paths/brand.swagger.js";
import { ProductCreateRequestSchema, ProductSchema, ProductUpdateRequestSchema, PricePairSchema } from "./schemas/product.schema.js";
import { CustomerAuthResponseSchema, CustomerLoginRequestSchema, RefreshTokenRequestSchema, UserAuthResponseSchema, UserLoginRequestSchema } from "./schemas/auth.schema.js";
import { BranchCreateRequestSchema, BranchSchema, BranchUpdateRequestSchema } from "./schemas/branch.schema.js";
import { CustomerCreateRequestSchema, CustomerSchema } from "./schemas/customer.schema.js";
import { OrderCreateRequestSchema, OrderSchema, OrderUpdateRequestSchema } from "./schemas/order.schema.js";
import { RoleCreateRequestSchema, RoleSchema, RoleUpdateRequestSchema } from "./schemas/role.schema.js";
import { StockSchema, StockUpdateRequestSchema } from "./schemas/stock.schema.js";
import { TransferStockCreateRequestSchema, TransferStockSchema } from "./schemas/transfer_stock.schema.js";
import { UserCreateRequestSchema, UserSchema, UserUpdateRequestSchema } from "./schemas/user.schema.js";
import { PermissionSchema } from "./schemas/permission.schema.js";
import { CartCreateRequestSchema, CartItemSchema, CartSchema } from "./schemas/cart.schema.js";
import { CountrySchema } from "./schemas/country.schema.js";
import { CurrencyRateSchema } from "./schemas/currency_rate.schema.js";
import { CategorySchema, CategoryCreateRequestSchema, CategoryUpdateRequestSchema } from "./schemas/category.schema.js";
import { BrandSchema, BrandCreateRequestSchema, BrandUpdateRequestSchema } from "./schemas/brand.schema.js";

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
                // url: "https://retailexpress.onrender.com"
                url: "http://localhost:3000"
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
            ...cartPaths,
            ...countryPaths,
            ...currencyRatePaths,
            ...categoryPaths,
            ...brandPaths
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
                PricePair: PricePairSchema,
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
                CartCreateRequest: CartCreateRequestSchema,
                Country: CountrySchema,
                CurrencyRate: CurrencyRateSchema,
                Category: CategorySchema,
                CategoryCreateRequest: CategoryCreateRequestSchema,
                CategoryUpdateRequest: CategoryUpdateRequestSchema,
                Brand: BrandSchema,
                BrandCreateRequest: BrandCreateRequestSchema,
                BrandUpdateRequest: BrandUpdateRequestSchema
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },

    apis: [
        // "./src/routes/*.js"
    ]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;