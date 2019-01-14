<template>
  <div id="app">
    <md-card>
      <md-card-header>
        {{restaurant.name}}
      </md-card-header>
      <md-card-content>
        Cuisine : {{restaurant.cuisine}} <br>
        Adresse : {{restaurant.address.building}} {{restaurant.address.street}},
        {{restaurant.borough}} {{restaurant.address.zipcode}}
      </md-card-content>
      <md-card-content v-if="restaurant.grades !== null">
        Grades :
        <ul>
          <li v-for="grade in restaurant.grades">
            {{grade.grade}} <span style="color: grey; font-style: italic; font-size: 90%">( score of {{grade.score}} at {{grade.date}} )</span>
          </li>
        </ul>
          <router-link :to="{ name: 'menu', params: { id: restaurant._id }}">Menu</router-link>
      </md-card-content>
    </md-card>
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
