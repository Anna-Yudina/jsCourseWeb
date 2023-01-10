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
        checked: false,
        contacts: [],
        mainChecked: false,
        isNameTextInvalid: false,
        isSurnameTextInvalid: false,
        isPhoneTextInvalid: false,
        contactToDelete: null
    },

    created: function () {
        this.loadContacts();
    },

    methods: {
        isContactCheckboxChange: function (){
            this.mainChecked = false;
        },

        isMainCheckboxChange: function (){
            var isMainChecked = !this.mainChecked;

            this.contacts.forEach(function (c) {
                c.checked = isMainChecked;
            });
        },

        loadContacts: function () {
            var self = this;

            get("/api/getContacts", {term: this.term}).done(function (contacts) {
                self.contacts = contacts;
            }).fail(function () {
                alert("Ошибка при загрузке контактов");
            });
        },

        showDeleteButtonConfirmDialog: function (deletedContact) {
            this.contactToDelete = deletedContact;

            new bootstrap.Modal(this.$refs.deleteButtonConfirmDialog).show();
        },

        showDeleteCheckboxConfirmDialog: function () {
            new bootstrap.Modal(this.$refs.deleteCheckboxConfirmDialog).show();
        },

        deletedChecked: function () {
            var checkedContactsIds = this.contacts.filter(function (c) {
                return c.checked === true;
            }).map(function (c) {
                return {id: c.id};
            });

            var self = this;

            post("/api/deleteContacts", checkedContactsIds).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert("Ошибка при удалении контакта");
            });
        },

        deleteContact: function () {
            var self = this;

            post("/api/deleteContacts", [{id: this.contactToDelete.id}]).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert("Ошибка при удалении контакта");
            });
        },

        doValidation: function (name, surname, phone) {
            var isInvalid = false;

            if (name.length === 0) {
                this.isNameTextInvalid = true;
                isInvalid = true;
            }

            if (surname.length === 0) {
                this.isSurnameTextInvalid = true;
                isInvalid = true;
            }

            if (phone.length === 0) {
                this.isPhoneTextInvalid = true;
                isInvalid = true;
            }

            return isInvalid;
        },

        createContact: function () {
            this.isNameTextInvalid = false;
            this.isSurnameTextInvalid = false;
            this.isPhoneTextInvalid = false;

            if (this.doValidation(this.name, this.surname, this.phone)) {
                return;
            }

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
            });
        }
    }

    // watch: {
    //     mainChecked: function () {
    //         var isMainChecked = this.mainChecked;
    //
    //         this.contacts.forEach(function (c) {
    //             c.checked = isMainChecked;
    //         });
    //     }
    // }
})