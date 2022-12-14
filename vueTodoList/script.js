new Vue({
    el: "#app",

    data: {
        newTodoText: '',
        items: [],
        currentTodoId: 0,
        isNewTodoTextInvalid: false
    },

    methods: {
        addNewTodo: function () {
            var newTodoText = this.newTodoText;
            this.isNewTodoTextInvalid = false;

            if(newTodoText === ''){
                this.isNewTodoTextInvalid = true;
                return;
            }

            this.items.push({
                id: this.currentTodoId,
                text: this.newTodoText
            });

            this.newTodoText = '';
            ++ this.currentTodoId;
        },

        deleteItem: function (item){
            this.items = this.items.filter(function (x){
                return x !== item;
            });
        }
    },

    watch: {
        newTodoText: function (newValue){
            if (newValue.length > 0){
                this.isNewTodoTextInvalid = false;
            }
        }
    }
});