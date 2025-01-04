const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if the username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: "Username already exists. Please choose a different username." });
    }

    // Add the new user to the list
    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully!" });
});

public_users.post("/customer/login", (req,res) => {
    return res.status(201).json({message: "Login successful!"});
    // const { username, password } = req.body;

    // Validate username and password
    // if (!username || !password) {
    //     return res.status(400).json({ message: "Username and password are required." });
    // }

    // Check if user exists and password matches

        // return res.status(401).json({ message: "Login successful!." });
        // return res.status(300).json({message: message: "Login successful!."});
    // Generate JWT
    // const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    // res.status(200).json({
    //     message: "Login successful!",
    //     token
    // });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn; // Obtener el parámetro de la URL
    const book = books[isbn]; // Buscar el libro en el objeto books

    if (book) {
        res.json(book); // Enviar el libro como respuesta si existe
    } else {
        res.status(404).json({ message: "Book not found" }); // Responder con un error 404 si no se encuentra
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author; // Obtener el autor de los parámetros de la ruta
    const results = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());
    
    if (results.length > 0) {
        res.status(200).json(results);
    } else {
        res.status(404).json({ message: "No books found for the given author." });
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title; // Obtener el título de los parámetros de la ruta
    const results = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase());

    if (results.length > 0) {
        res.status(200).json(results);
    } else {
        res.status(404).json({ message: "No books found with the given title." });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn; // Obtener el ISBN de los parámetros de la ruta

    if (books[isbn]) {
        res.status(200).json(books[isbn].reviews); // Devolver las reseñas del libro
    } else {
        res.status(404).json({ message: "Book not found with the given ISBN." }); // Si no se encuentra el libro
    }
});

module.exports.general = public_users;

