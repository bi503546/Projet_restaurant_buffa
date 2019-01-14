<template>
  <div id="app">
    Restau : {{restaurant}}
    <br><md-button v-on:click.native="getMenu">Menu</md-button>
  </div>
</template>

<script>

let SERVER_URL = 'http://localhost:8080/'
let RESOURCE = 'api/restaurants'

export default {
  name: 'app-restau-detail',
  props: {
    id: String
  },
  mounted () {
    console.log(this.id)
    this.getRestaurant()
  },
  data: function () {
    return {
      restaurant: {}
    }
  },
  methods: {
    async getRestaurant () {
      let url = SERVER_URL + RESOURCE + '/' + this.id
      let response = await fetch(url)
      let ob = await response.json()
      let res = ob.restaurant
      this.restaurant = res
      console.log(response)
    }
  }
}
</script>

<style>

</style>
