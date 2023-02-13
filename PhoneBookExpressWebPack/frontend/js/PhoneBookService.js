import $ from "jquery";

function get(url, data) {
    return $.get(url, data);
}

function post(url, data) {
    return $.post({
        url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

export class PhoneBookService {
    constructor() {
        this.url = "/api/";
    }

    getContacts(term) {
        return get(this.url + "getContacts", {term});
    };

    createContacts(contact) {
        return post(this.url + "createContact", contact);
    };

    deleteContacts(ids) {
        return post(this.url + "deleteContacts", ids);
    };
}