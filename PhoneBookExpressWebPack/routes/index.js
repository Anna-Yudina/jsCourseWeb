const express = require('express');
const router = express.Router();

let currentContactId = 1;
let contacts = [];

router.get("/api/getContacts", function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    const result = term.length === 0
        ? contacts
        : contacts.filter(function (c) {
        return c.name.toUpperCase().includes(term) || c.surname.toUpperCase().includes(term) || c.phone.toUpperCase().includes(term);
    });

    res.send(result);
});

router.post("/api/deleteContacts", function (req, res) {
    const ids = req.body;

    contacts = contacts.filter(function (item) {
        return ids.indexOf(item.id) === -1;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/createContact", function (req, res) {
    const requestData = req.body;

    if (contacts.some(function (c) {
        return c.phone.toUpperCase() === requestData.phone.toUpperCase();
    })) {
        res.send({
            success: false,
            message: "Данный контакт уже существует"
        });

        return;
    }

    const contact = {
        id: currentContactId,
        name: requestData.name,
        surname: requestData.surname,
        phone: requestData.phone
    };

    currentContactId++;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

module.exports = router;
