var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express3'});
});

var currentContactId = 1;
var contacts = [];

router.get("/api/getContacts", function (req, res) {
    var term = (req.query.term || "").toUpperCase();

    var result = term.length === 0 ? contacts : contacts.filter(function (c) {
        return c.name.toUpperCase().includes(term) || c.surname.toUpperCase().includes(term) || c.phone.toUpperCase().includes(term);
    });

    res.send(result);
});

router.post("/api/deleteContacts", function (req, res) {
    var id = req.body.id

    contacts = contacts.filter(function (c) {
        return c.id !== id;
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/createContact", function (req, res) {
    var requestData = req.body;

    if(!requestData.name){
        res.send({
            success: false,
            message: "Не введено имя"
        });
        return;
    }

    if(!requestData.surname){
        res.send({
            success: false,
            message: "Не введена фамилия"
        });
        return;
    }

    if(!requestData.phone){
        res.send({
            success: false,
            message: "Не введен номмер телефона"
        });
        return;
    }

    if(contacts.some(function (c){
        return c.phone.toUpperCase() === requestData.phone.toUpperCase();
    })){
        res.send({
            success: false,
            message: "Данный контакт уже существует"
        });
        return;
    }

    var contact = {
        id: currentContactId,
        name: requestData.name,
        surname: requestData.surname,
        phone: requestData.phone
    }

    currentContactId++;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });

})
module.exports = router;
