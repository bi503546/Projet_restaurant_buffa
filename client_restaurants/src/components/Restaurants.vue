<template>
  <div id="app">
    <app-restau  v-for="r in restaurants" :key="r.id" :restau="r"></app-restau>
  </div>
</template>

<script>

import AppRestau from './AppRestau'

let SERVER_URL = 'http://localhost:8080/'
let RESOURCE = 'api/restaurants'

export default {
  name: 'restaurants',
  components: {AppRestau},
  data: function () {
    return {
      restaurants: [],
      nom: '',
      cuisine: '',
      nbRestaurants: 0,
      page: 0,
      pagesize: 10,
      name: '',
      addForm: false,
      restaurantToModify: null
    }
  },
  created () {
    this.getRestaurantsFromServer()
  },
  methods: {
    getRestaurantsFromServer () {
      let url = SERVER_URL + RESOURCE +
        '?page=' + this.page +
        '&pagesize=' + this.pagesize +
        '&name=' + this.name

      fetch(url)
        .then((reponseJSON) => {
          reponseJSON.json()
            .then((reponseJS) => {
              this.restaurants = reponseJS.data
              this.nbRestaurants = reponseJS.count
              console.log(reponseJS.msg)
            })
        }).catch((err) => {
          console.log(err)
        })
      console.log('Page actuelle : ' + this.page)
    }
  }
}
</script>

<style>

</style>
