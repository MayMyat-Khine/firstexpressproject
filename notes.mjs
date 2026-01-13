// ✅check update origina id and delete/new ids are not having any same
//(non-sense/business login) also origianl_products at update should have the possibility of [] in case the update is only for delete or newadd products
// ✅only delete_products has data and neither original nor new are empty 
// ✅ new_products are not already include in original_products
// ✅ deletee/original_products are also inculded in order already

// delete branch=> delete all data(prdocuts/stock/order/)
//✅ at product [branch1,branch2]=> check for if product is already , then add the new branch to that product and not create one so product with [branches] will valid

// to add "PRICE" field at products and order
// api for get all order and products on specific branch
// api for get all stock of products on all branches
// seperate repo layer from the service layer

// bulkWrite is great when:
// updating many documents
// It is bad when:
// updating one document many times