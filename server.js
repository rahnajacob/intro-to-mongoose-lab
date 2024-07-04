//Constants/Imports

const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const customer = require("./models/crm.js")
const prompt = require('prompt-sync')();

//Variables

let customerName
let customerAge
let customerId
let customerData

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


//Input logic
//Checking for valid input: if action = Number && action > 0 && action < 5 then proceed
//else return "Please enter a valid input"

function validInput(action) {
    if (parseInt(action) === Number && parseInt(action) > 0 && parseInt(action) < 5) {
        return true
    } else {
        return `Please enter a valid input`
    }
}

if (action === "1" && validInput()) {
    const customerData = {
        customerName: prompt("Please enter customer name:"),
        customerAge: prompt("Please enter customer age:")
    }
    createCustomer(customerData)
} else if (action === "2" && validInput()) {
    viewAllCustomers()        //function to display all
} else if (action === "3" && validInput()) {
    viewAllCustomers() //display list of customers so far
    customerId = prompt("PLease enter the ID of the customer you want to edit:")    //accept customer id (as a prompt) to get to the customer object in question
    customerData = {        //display (action = 1) prompts and reassign them to the customer object
        customerName: prompt("Please enter the customer name for updation:"),
        customerAge: prompt("Please enter the customer age for updation:")
    }
    updateCustomer()        //function to update
} else if (action === "4" && validInput()) {
    viewAllCustomers()  //display list of customers so far
    customerId = prompt("Please enter the ID of the customer you want to delete")   //get customer id from user
    deleteCustomer()        //function to delete
} else if (action === "5" && validInput()) {
    mongoose.connection.close()
    process.exit()
}


//Functions

const createCustomer = async (customerData) => {
    try {
        const newCustomer = await customer.create(customerData)
    } catch (err) {
        console.log(err)
    }
}

const viewAllCustomers = async () => {
    try {
        const allCustomers = await customer.find({})
    } catch (err) {
        console.log(err)
    }
}

const updateCustomer = async () => {
    try {
        const updatingCustomer = await customer.findByIdAndUpdate()
    } catch (err) {
        console.log(err)
    }
}

const deleteCustomer = async () => {
    try {
        const deletedCustomer = await customer.findByIdAndDelete(customerId)
    } catch (err) {
        console.log(err)
    }
}

