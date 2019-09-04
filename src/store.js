import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex)


export default new vuex.Store({
    state: {
        newTodo: "",
        filter: "all",
        todos: [
          {editing:false, id: "0", item: "solve a problem one day",completed: false},
          {editing:false, id: "1", item: "看完一篇英语新闻", completed: false},
          {editing:false, id: "2", item: "读一篇技术博客", completed: false},
        ],
        beforeEditCache: ""
    }
})