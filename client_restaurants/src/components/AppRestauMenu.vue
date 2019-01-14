<template>
  <div id="app">
    Id : {{$route.params.id}}
  </div>
</template>

<script>

export default {
  name: 'app-restau-menu',
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
