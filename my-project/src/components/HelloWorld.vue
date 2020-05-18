<template>
  <div class="hello">
    <h1>{{ this.$store.state.count }}</h1>
    <h2>Essential Links</h2>
    <h2>Ecosystem</h2>
    <button @click="add">+</button>
    <button @click="asyncAdd">asyncAdd</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    add () {
      this.$store.commit('add', 3)
    },
    async asyncAdd () {
      const result = await this.$store.dispatch('asyncAdd')
      console.log(result)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
