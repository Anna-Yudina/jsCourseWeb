function get(url, data) {
    return $.get({
        url: url,
        data: data
    })
}

function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

new Vue({
    el: "#app",

    data: {
        name: "",
        surname: "",
        phone: "",
        term: "",
        contacts: [],
        checked: false
    },

    created: function () {
        this.loadContacts();
    },

    methods: {
        loadContacts: function () {
            var self = this;

            get("/api/getContacts", {term: this.term}).done(function (contacts) {
                self.contacts = contacts;
            }).fail(function () {
                alert("Ошибка при загрузке контактов");
            })
        },

        deletedChecked: function (){
            var checkedContacts = this.contacts.filter(function (c) {
                return c.checked === true;
            });



            checkedContacts.forEach(function (c){
                console.log(c);
                this.deleteContact(c);
            })
        },

        deleteContact: function (c) {
            console.log('deleteContact' + c);
            var self = this;

            post("/api/deleteContacts", {id: c.id}).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert("Ошибка при удалении контакта");
            })
        },

        createContact: function () {
            var self = this;

            var request = {
                name: this.name,
                surname: this.surname,
                phone: this.phone
            };

            post("/api/createContact", request).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContacts();
                self.name = "";
                self.surname = "";
                self.phone = "";
            }).fail(function () {
                alert("Ошибка при добавлении контакта");
            })
        }
    }
});