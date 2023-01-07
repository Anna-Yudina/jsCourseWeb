Vue.component("todo-item", {
    template: "#todo-item-template",

    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data: function () {
        return {
            isEditing: false,
            editingText: "",
            isInvalid: false
        };
    },

    methods: {
        editItem: function () {
            this.isInvalid = false;
            this.editingText = this.item.text;
            this.isEditing = true;
        },

        saveItem: function () {
            this.isInvalid = false;
            var newValue = this.editingText;

            if (newValue.length === 0) {
                this.isInvalid = true;
                return;
            }

            this.$emit("save-item", this.item, this.editingText);
            this.isEditing = false;
        }
    },

    watch: {
        inputText: function (newValue) {
            if (newValue.length > 0) {
                this.isInvalid = false;
            }
        }
    }
});

var vm = new Vue({
    el: "#app",

    data: {
        isInputTextInvalid: false,
        items: [],
        inputText: "",
        currentItemId: 1
    },

    methods: {
        add: function () {
            this.isInputTextInvalid = false;

            this.inputText = this.inputText.trim();

            if (this.inputText.length === 0) {
                this.isInputTextInvalid = true;
                return;
            }

            this.items.push({
                id: this.currentItemId,
                text: this.inputText
            });

            this.inputText = "";
            this.currentItemId++;
        },

        deleteItem: function (item) {
            this.items = this.items.filter(function (x) {
                return x !== item;
            })
        },

        saveItem: function (item, newText) {
            item.text = newText;
        },
    },

    watch: {
        inputText: function (newValue) {
            if (newValue.length > 0) {
                this.isInputTextInvalid = false;
            }
        }
    }
});