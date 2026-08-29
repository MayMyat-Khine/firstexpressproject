import mongoose from "mongoose";
import { Customer } from "../mongoose/schemas/customer.js";

export async function createCustomerRepo(customer) {
    const newCustomer = new Customer(customer);
    const savedCustomer = await newCustomer.save();
    return savedCustomer;
}

export async function getCustomerByIdRepo(id) {
    return await Customer.findOne({ id: id });
}

export async function getCustomersRepo() {
    return await Customer.find();
}
export async function findCustomerByPhone(phone) {

    return await Customer.findOne({
        phone_number: phone
    });

}


export const deleteCustomerRepo = async (id) => {
    const deletedCustomer = await Customer.findOneAndDelete({ id: id });
    return deletedCustomer;
}

export const updateCustomerRepo = async (id, customerData) => {
    console.log("ID", id)
    console.log("Customer Data", customerData)
    const updatedCustomer = await Customer.findOneAndUpdate(
        { id: id },
        { $set: customerData }, { new: true });

    return updatedCustomer;
}