import { Customer } from "../mongoose/schemas/customer.mjs";

export async function createCustomerRepo(customer) {
    const newCustomer = new Customer(customer);
    const savedCustomer = await newCustomer.save();
    return savedCustomer;
}
