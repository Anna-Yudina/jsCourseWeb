<template>
  <div v-cloak class="container">
    <h1>Телефонная книга &#9742;</h1>
    <form class="mb-3" @submit.prevent="createContact">
      <div class="row mb-2">
        <div class="col-12 col-lg-4 mb-2">
          <input v-model="name" type="text" class="form-control" id="input-name" placeholder="Имя контакта"
                 :class="{ 'is-invalid': isNameTextInvalid }">
          <div class="invalid-feedback">Имя обязательное поле!</div>
        </div>
        <div class="col-12 col-lg-4 mb-2">
          <input v-model="surname" type="text" class="form-control" id="input-surname" placeholder="Фамилия контакта"
                 :class="{ 'is-invalid': isSurnameTextInvalid }">
          <div class="invalid-feedback">Фамилия обязательное поле!</div>
        </div>
        <div class="col-12 col-lg-4 mb-2">
          <input v-model="phone" type="text" class="form-control" id="input-phone" placeholder="Телефонный номер"
                 :class="{ 'is-invalid': isPhoneTextInvalid }">
          <div class="invalid-feedback">{{ phoneNumberErrorMessage }}</div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mb-2">Создать</button>
    </form>
    <hr>
    <form class="mb-3" @submit.prevent="loadContacts">
      <h2>Поиск</h2>
      <div class="d-flex">
        <input v-model="term" type="search" class="form-control me-2 search">
        <button class="btn btn-primary" type="submit">Поиск</button>
      </div>
    </form>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="table-info">
        <tr>
          <th class="text-center"><input type="checkbox" v-model="isMainChecked"></th>
          <th class="text-center">Номер</th>
          <th class="text-center w-25">Имя</th>
          <th class="text-center w-25">Фамилия</th>
          <th class="text-center w-25">Телефон</th>
          <th class=""></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(contact, index) in contacts" :key="contact.id">
          <td class="text-center"><input type="checkbox" v-model="contact.isChecked"></td>
          <td v-text="index + 1"></td>
          <td v-text="contact.name"></td>
          <td v-text="contact.surname"></td>
          <td v-text="contact.phone"></td>
          <td class="text-center">
            <button @click="showDeleteButtonConfirmDialog(contact)" type="button" class="btn btn-danger"
                    title="Удаление">
              &#9747;
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <button type="button" class="btn btn-danger" @click="showDeleteCheckboxConfirmDialog">Удалить выбранные</button>
    </div>
    <div ref="deleteButtonConfirmDialog" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Подтверждение удаления</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Вы действительно хотите удалить контакт?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" @click="deleteContact" class="btn btn-primary" data-bs-dismiss="modal">ОК</button>
          </div>
        </div>
      </div>
    </div>
    <div ref="deleteCheckboxConfirmDialog" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Подтверждение удаления</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Вы действительно хотите удалить контакты?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" @click="deleteChecked" class="btn btn-primary" data-bs-dismiss="modal">ОК</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import $ from "jquery";
import "../css/style.scss";

function get(url, data) {
  return $.get({
    url,
    data
  })
}

function post(url, data) {
  return $.post({
    url,
    data: JSON.stringify(data),
    contentType: "application/json"
  });
}

export default {
  data() {
    return {
      name: "",
      surname: "",
      phone: "",
      term: "",
      isChecked: false,
      contacts: [],
      isMainChecked: false,
      isNameTextInvalid: false,
      isSurnameTextInvalid: false,
      isPhoneTextInvalid: false,
      contactToDelete: null,
      phoneNumberErrorMessage: "",
      checkedContactsIds: []
    }
  },

  created() {
    this.loadContacts();
  },

  methods: {
    loadContacts() {
      this.checkedContactsIds = this.contacts.filter((c) => c.isChecked === true).map((c) => c.id)
      console.log("loadContacts() " + this.checkedContactsIds)

      get("/api/getContacts", {term: this.term}).done((contacts) => {
        this.contacts = contacts;
        contacts.forEach((contact) => {
          this.checkedContactsIds.forEach((checkedContactId) => {
            if (contact.id === checkedContactId) {
              contact.isChecked = true;
            }
          })
        });
      }).fail(() => {
        alert("Ошибка при загрузке контактов");
      });
    },

    showDeleteButtonConfirmDialog(deletedContact) {
      this.contactToDelete = deletedContact;

      new bootstrap.Modal(this.$refs.deleteButtonConfirmDialog).show();
    },

    showDeleteCheckboxConfirmDialog() {
      new bootstrap.Modal(this.$refs.deleteCheckboxConfirmDialog).show();
    },

    deleteChecked() {
      let checkedContactsIds = this.contacts.filter((contact) => {
        return contact.isChecked === true;
      }).map((contact) => {
        return contact.id;
      });

      post("/api/deleteContacts", checkedContactsIds).done((response) => {
        if (!response.success) {
          alert(response.message);
          return;
        }

        this.loadContacts();
      }).fail(() => {
        alert("Ошибка при удалении контакта");
      });
    },

    deleteContact() {
      post("/api/deleteContacts", [this.contactToDelete.id]).done((response) => {
        if (!response.success) {
          alert(response.message);
          return;
        }
        this.loadContacts();
      }).fail(() => {
        alert("Ошибка при удалении контакта");
      });
    },

    isValid() {
      let isValid = true;
      this.isNameTextInvalid = false;
      this.isSurnameTextInvalid = false;
      this.isPhoneTextInvalid = false;

      if (this.name.length === 0) {
        this.isNameTextInvalid = true;
        isValid = false;
      }

      if (this.surname.length === 0) {
        this.isSurnameTextInvalid = true;
        isValid = false;
      }

      if (this.phone.length === 0) {
        this.isPhoneTextInvalid = true;
        this.phoneNumberErrorMessage = "Номер телефона обязательное поле!";
        isValid = false;
      }

      return isValid;
    },

    createContact() {
      if (!this.isValid()) {
        return;
      }

      let request = {
        name: this.name,
        surname: this.surname,
        phone: this.phone
      };

      post("/api/createContact", request).done((response) => {
        if (!response.success) {
          this.isPhoneTextInvalid = true;
          this.phoneNumberErrorMessage = response.message;
          return;
        }

        this.loadContacts();
        this.name = "";
        this.surname = "";
        this.phone = "";
      }).fail(() => {
        alert("Ошибка при добавлении контакта");
      });
    }
  },

  watch: {
    isMainChecked() {
      console.log(this.isMainChecked)
      this.contacts.forEach((c) => {
        c.isChecked = this.isMainChecked;
      });
    },
    contacts() {
      if (this.contacts.length === 0) {
        this.isMainChecked = false;
      }
    }
  }
}
</script>
