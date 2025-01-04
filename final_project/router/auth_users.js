const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

regd_users.post('/register', (req, res) => {

});

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn; // Extract ISBN from the URL
    const { review } = req.query; // Extract review from the query parameters
    const username = session.username; // Get the username from the session

    // Validate input
    if (!username) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    if (!review) {
        return res.status(400).json({ message: "Review content is required." });
    }

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found with the given ISBN." });
    }

    // Add or update the review
    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    books[isbn].reviews[username] = review; // Add or update the review for the user
    res.status(200).json({ message: "Review added/updated successfully.", reviews: books[isbn].reviews });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

