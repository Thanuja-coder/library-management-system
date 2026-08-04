const express = require('express');
const { users } = require('../data/users.json');

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all users
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 */
router.post('/', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;

    if (!id || !name) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    const user = users.find((each) => String(each.id) === String(id));
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already exists with this ID"
        });
    }

    const newUser = { id, name, surname, email, "Subscription type": subscriptionType, "subscription date": subscriptionDate };
    users.push(newUser); // In a real app this would save to a DB

    return res.status(201).json({
        success: true,
        data: newUser
    });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get user by ID
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => String(each.id) === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: user
    });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Update user data
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => String(each.id) === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const updatedUser = { ...user, ...data };

    // update the user in the array
    const index = users.indexOf(user);
    users[index] = updatedUser;

    return res.status(200).json({
        success: true,
        data: updatedUser
    });
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete user by ID
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => String(each.id) === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
});

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get user subscription details
 */
router.get('/subscription-details/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => String(each.id) === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

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

    const subscriptionType = (date) => {
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

    let returnDate = getDateInDays(user["return date"]);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user["subscription date"]);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    let fine = 0;
    if (returnDate < currentDate) {
        if (subscriptionExpiration <= currentDate) {
            fine = 200; // both expired
        } else {
            fine = 100; // only return date expired
        }
    } else if (subscriptionExpiration <= currentDate) {
        fine = 100; // only subscription expired
    }

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: fine
    }

    return res.status(200).json({
        success: true,
        data
    });
});

module.exports = router;
