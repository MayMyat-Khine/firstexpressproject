import { matchedData } from "express-validator";

export async function orderCreateController(req, res) {
    try {

        const validDate = matchedData(req);
        console.log("Here is valid data in order controller");
        const savedOrder = await createOrderService(validDate);

        // check merchant id and customer id are valid
        // check product data is valid
        // check the purchase stock is lower then the max stock of the product
        // save the order create
    } catch (error) { }
}