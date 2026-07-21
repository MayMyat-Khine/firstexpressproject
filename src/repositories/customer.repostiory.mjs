import { Customer } from "../mongoose/schemas/customer.mjs";

export async function createCustomerRepo(customer) {
    const newCustomer = new Customer(customer);
    const savedCustomer = await newCustomer.save();
    return savedCustomer;
}

export async function getCustomerByIdRepo(id) {
    return await Customer.findOne({ id: id });
}

export async function findCustomerByPhone(phone) {

    return await Customer.findOne({
        phone_number: phone
    });

}