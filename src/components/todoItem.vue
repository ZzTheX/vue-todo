<template>
    <div class="todo-item">
         <div class="todo-item-left">
            <input type="checkbox" v-model="completed" >
            <div v-if="!editing" class="todo-item-label" @dblclick="editTodo" :class="{completed:completed}">{{ item }}</div>
            <input v-else v-focus class="todo-item-edit" type="text" v-model="item" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit">
          </div>
          <div class="remove-item" @click="removeTodo(index)">
            &times;
          </div>
    </div>
</template>

<script>
    export default {
        name: "todoItem",
        props: {
            todo: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            },
            checkAll: {
                type: Boolean,
                required: true
            }
        },
        watch: {
            checkAll() {
                this.completed = this.chekAll ? true : this.todo.completed
            }
        },
        data() {
          return {
            id: this.todo.id,
            completed: this.todo.completed,
            item: this.todo.item,
            editing: this.todo.editing,
            beforeEditCache: ""
          }
        },
        methods: {
            removeTodo(index) {
                window.eventBus.$emit("removedTodo", index)
            },
            editTodo() {
                this.beforeEditCache = this.item
                this.editing = true
            },
            doneEdit() {
                window.eventBus.$emit("finishedEdit",{
                    index: this.index,
                    data: {
                        id: this.id,
                        completed: this.completed,
                        item: this.item,
                        editing: this.editing
                    }
                })
                this.editing = false
            },
            cancelEdit(todo){
                todo.editing = false
                todo.item =  this.beforeEditCache
            },
        }

    }
</script>

<style>

</style>