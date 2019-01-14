<template>
  <div id="app">
    Adresse : {{id}}
    <br><md-button v-on:click.native="getMenu">Menu</md-button>
  </div>
</template>

<script>

export default {
  name: 'app-restau-detail',
  props: {
    id: String,
    restau: Object
  },
  mounted () {
    console.log(this.id)
  },
  data: function () {
    return {
      menu: false
    }
  },
  methods: {
    getMenu () {
      if (this.menu === true) {
        this.menu = false
      } else {
        this.menu = true
      }
      console.log(this.menu)
    }
  }
}
</script>

<style>

</style>
