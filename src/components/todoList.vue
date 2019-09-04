<template>
  <div class="hello">
    <input type="text" class="todo-list" placeholder="what needs to be done"
    v-model="newTodo" @keyup.enter="addTodo">
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
         <todo-item 
         v-for="(todo, index) in todosFiltered" 
         :todo="todo" :index="index" 
         :key="todo.id" 
         :checkAll = "!anyRemaining"
         @removedTodo="removeTodo"
         @finishedEdit="finishedEdit">
         </todo-item>
      </transition-group>

     <div class="extra-container">
       <div>
         <label for=""><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">checkAll</label>
       </div>
       <div>{{ remaining }} items left</div>
     </div>

     <div class="extra-container">
       <div>
         <button :class='{active: filter === "all"}' @click='filter = "all"'>All</button>
         <button :class='{active: filter === "active"}'  @click='filter = "active"'>Active</button>
         <button :class='{active: filter === "completed"}' @click='filter = "completed"'>Completed</button>
       </div> 
       <div>
         <transition name="fade">
           <button v-show="anyCompleted" @click="clearCompleted">Clear Completed</button>
         </transition>
       </div>
     </div>
  </div>
</template>

<script>
import todoItem from "./todoItem"
import {hello} from "../main.js"
     console.log(hello)
export default {
  name: 'todoList',
  props: {
    msg: String
  },
  components: {
    todoItem
  },
  data() {
    return this.$store.state
  },
  directives: {
   focus: {
     inserted(el) {
       el.focus()
     }
   }
  },
  methods: {
    addTodo() {
     this.$store.state.todos.push({editing: false, id: this.$store.state.todos.length, item: this.$store.state.newTodo, completed: false})
      this.$store.state.newTodo = ""
    },
    removeTodo(index) {
      this.$store.state.todos.splice(index, 1)
    },
    editTodo(todo) {
      this.beforeEditCache = todo.item
      todo.editing = true
    },
    cancelEdit(todo){
      todo.editing = false
      todo.item =  this.beforeEditCache
    },
    doneEdit(todo) {
      todo.editing = false
    },
    checkAllTodos() {
     this.$store.state.todos.forEach(item => item.completed = event.target.checked)
    },
    clearCompleted(){
      this.$store.state.todos = this.$store.state.todos.filter(item => !item.completed)
    },
    finishedEdit(data) {
      this.$store.state.todos.splice(data.index, 1, data.data)
    }
  },
  computed: {
   anyRemaining() {
      return this.$store.state.filter(item => item.completed === false).length
   },
   remaining() {
     return this.$store.state.filter(item => item.completed === false).length
   },
   todosFiltered() {
     console.log(this.$store.state)

     switch (this.$store.state.todos.filter) {
        case "all":
          return this.$store.state.todos
        case "active": 
          return this.$store.state.todos.filter(item => item.completed === false)
        case "completed":
          return this.$store.state.todos.filter(item => item.completed === true )
     }
     return ""
   },
   anyCompleted() {
    return this.$store.state.todos.some(item => item.completed === true)
   }
  }
}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .todo-list {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition-duration: .5s;
  }
  .remove-item {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  .todo-item-left {
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    &:focus {
      outline: none;
    }
  }
  .completed {
    text-decoration: line-through;
    color: gray;
    text-decoration: line
  }
  .extra-container {
    padding-top: 14px;
    margin-top: 14px;
    border-top: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    outline:none;
    border: 1px solid gray;
    background-color: #fff;
    margin-right: 10px;
  }
  .active {
    background-color: lightblue;
  }
  .fade-enter-active, .fade.leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to {
        opacity: 0;
  }
</style>
