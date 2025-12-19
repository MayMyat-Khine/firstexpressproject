
import { matchedData } from "express-validator";
import { Stock } from "../mongoose/schemas/stock.mjs";
import { updatePatchStock, updateStock } from "../services/stock.service.mjs";

// export async function stockCreateController(req, res) {
//     const data = matchedData(req);
//     const newStock = new Stock(data);
//     try {
//         const savedStock = await newStock.save();
//         return res.status(201).send({ success: true, body: savedStock });
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// export async function stockGetAllController(req, res) {
//     try {
//         console.log("here is get stock api");
//         const stocks = await Stock.find();
//         res.json({ success: true, body: stocks });
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         });
//     }
// };

// export function stockGetByIdController(req, res) {
//     try {
//         const { foundstock } = req;
//         return res.status(200).send({ success: true, body: foundstock });
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         });
//     }

// }

export async function stockUpdateByProductIdController(req, res) {
    const { body, params: { id } } = req;
    try {
        const updatedStock = await updateStock({ id: id, stockData: body });
        if (!updatedStock) return res.status(400).json({
            success: false,
            message: `stock with id ${id} not found`
        })
        return res.status(200).send({ message: "Successfully Updated", data: updatedStock })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function stockPatchByProductIdController(req, res) {
    try {
        const { body, params: { id } } = req;
        const updatedStock = await updatePatchStock({ id: id, stockData: body });
        if (updatedStock.matchedCount === 0)
            return res.status(400).json({
                success: false,
                message: `stock with id ${id} is  not found`
            })
        return res.status(200).send({ message: "Successfully Updated", data: updatedStock })
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

// export async function stockDeleteByIdController(req, res) {
//     try {
//         const { id } = req.params;
//         const deletedstock = await Stock.findOneAndDelete({ id: id });
//         if (!deletedstock) return res.status(404).json({
//             success: false,
//             message: `stock with id ${id} not found`
//         });
//         return res.status(200).json({
//             success: true,
//             message: `stock with id ${id} successfully deleted`
//         });
//     } catch (error) {
//         return res.status(400).send(error.message);
//     }
// }