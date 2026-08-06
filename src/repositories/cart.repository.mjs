import { Cart } from "../mongoose/schemas/cart.mjs";

export async function createCartRepo(cartData, customerId) {
    console.log("Card", cartData)
    const savedCart = await Cart.findOneAndUpdate(
        { customer_id: customerId },
        {
            customer_id: customerId,
            items: cartData
        },
        {
            new: true,
            upsert: true, //creates the cart if it doesn't exist.
            runValidators: true
        }
    );
    return savedCart;
}

export async function getCartRepo(customrId) {
    return await Cart.findOne({
        customer_id: customrId
    }).select("-customer_id")
}