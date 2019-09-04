<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" class="logo">
    <todoList/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import todoList from './components/todoList.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    todoList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 22px;;
}
* {
  box-sizing: border-box;
}
.container {
  max-width: 600px;
  margin: auto;
}
.logo {
  height: 60px;
}
</style>
