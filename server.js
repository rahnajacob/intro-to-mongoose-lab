//

const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const customer = require("./models/crm.js")
const prompt = require('prompt-sync')();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongoose is connected')                
    } catch (error) {
        console.log(error)         
    }
}

const action = prompt(`
    Welcome to the CRM
    
    What would you like to do?
    
      1. Create a customer
      2. View all customers
      3. Update a customer
      4. Delete a customer
      5. quit
    
    Number of action to run: 
    `)

//Checking for valid input: if action = Number && action > 0 && action < 5 then proceed
//else return "Please enter a valid input"

    if (action === "1") {
        const customerData = {
            name: prompt("Please enter customer name"),
            age: prompt("Please enter customer age")
        }
        createCustomer(customerData)
    } else if (action === "2") {
        //function to display all
        viewAllCustomers()
//     } else if (action === "3") {
//         //function to update
//         //display list of customers so far
//         //accept customer id (as a prompt) to get to the customer object in question
//         //display (action = 1) prompts 
//         //reassignt them to the customer object
//     } else if (action === "4") {
// //get customer id
// //function to delete
    } else if (action === "5") {
        await mongoose.connection.close()
        process.exit()
    }

const createCustomer = async (customerData) => {
    try {
        const newCustomer = await Customer.create(customerData)
    } catch (err) {
        console.log(err)
    }
}

const viewAllCustomers = async () => {
    try {
        const allCustomers = await Customer.find({})
    } catch (err) {
        console.log(err)
    }
}