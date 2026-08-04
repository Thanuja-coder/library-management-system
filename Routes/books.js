const express = require('express');
const { books } = require('../data/books.json');
const { users } = require('../data/users.json');

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});

/**
 * Route: /books
 * Method: POST
 * Description: Create a new book
 */
router.post('/', (req, res) => {
    const { data } = req.body;
    
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No data provided"
        });
    }

    const book = books.find((each) => String(each.id) === String(data.id));
    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book already exists with this ID"
        });
    }

    const allBooks = [...books, data]; // In a real app this would save to a DB
    
    return res.status(201).json({
        success: true,
        data: allBooks
    });
});

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 */
router.get('/issued', (req, res) => {
    const usersWithIssuedBooks = users.filter((each) => each["issued book"]);
    const issuedBooks = [];

    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each["issued book"]);
        if (book) {
            book.issuedBy = each.name;
            book.issuedDate = each["issued date"];
            book.returnDate = each["return date"];
            issuedBooks.push(book);
        }
    });

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No issued books found"
        });
    }

    return res.status(200).json({
        success: true,
        data: issuedBooks
    });
});

/**
 * Route: /books/issued/withFine
 * Method: GET
 * Description: Get all issued books with their fine amount
 */
router.get('/issued/withFine', (req, res) => {
    const usersWithIssuedBooks = users.filter((each) => each["issued book"]);
    const issuedBooksWithFine = [];

    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            date = new Date();
        } else {
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (user, date) => {
        let type = (user["Subscription type"] || "").toLowerCase();
        if (type === "basic") {
            date = date + 90;
        } else if (type === "standard") {
            date = date + 180;
        } else if (type === "premium") {
            date = date + 365;
        }
        return date;
    };

    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each["issued book"]);
        if (book) {
            let returnDate = getDateInDays(each["return date"]);
            let currentDate = getDateInDays();
            let subscriptionDate = getDateInDays(each["subscription date"]);
            let subscriptionExpiration = subscriptionType(each, subscriptionDate);
            
            let fine = 0;
            if (returnDate < currentDate) {
                if (subscriptionExpiration <= currentDate) {
                    fine = 200;
                } else {
                    fine = 100;
                }
            } else if (subscriptionExpiration <= currentDate) {
                fine = 100; // Missed only subscription renewal
            }

            const bookWithFine = {
                ...book,
                issuedBy: each.name,
                issuedDate: each["issued date"],
                returnDate: each["return date"],
                fine: fine
            };
            issuedBooksWithFine.push(bookWithFine);
        }
    });

    return res.status(200).json({
        success: true,
        data: issuedBooksWithFine
    });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by ID
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => String(each.id) === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: book
    });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update book data
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => String(each.id) === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    const updatedBook = { ...book, ...data };
    
    // update the book in the array
    const index = books.indexOf(book);
    books[index] = updatedBook;

    return res.status(200).json({
        success: true,
        data: updatedBook
    });
});

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete book by ID
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => String(each.id) === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    const index = books.indexOf(book);
    books.splice(index, 1);

    return res.status(200).json({
        success: true,
        message: "Book deleted successfully"
    });
});

module.exports = router;
