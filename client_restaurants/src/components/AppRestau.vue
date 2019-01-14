<template>
  <div id="app">
    <md-card>
      <md-card-header>
        <strong><i>{{restau.name}}</i></strong>
      </md-card-header>
      <md-card-content>
        Type de cuisine : {{restau.cuisine}}
        <div v-if="detail === true">
          Adresse : {{restau.address.building}} {{restau.address.street}}, {{restau.borough}} {{restau.address.zipcode}}
          <br>
          <md-button ><router-link :to="{ name: 'DétailsRestaurant', params: { id: restau._id }}">Plus de détails</router-link></md-button>
          <md-button v-on:click.native="getMenu">Menu</md-button>
        </div>
        <img src="../css/img/up.png" class="fleche" v-if="detail === true" v-on:click="collapse">
        <img src="../css/img/down.png" class="fleche" v-else v-on:click="collapse">
      </md-card-content>
    </md-card>
  </div>
</template>

<script>

import AppRestauDetail from './AppRestauDetail'

export default {
  name: 'app-restau',
  components: {AppRestauDetail},
  props: {
    restau: Object
  },
  data: function () {
    return {
      detail: false
    }
  },
  methods: {
    collapse () {
      if (this.detail === true) {
        this.detail = false
      } else {
        this.detail = true
      }
      console.log(this.detail)
    }
  }
}
</script>

<style>
.fleche {
  width: 20px;
  float: right;
}
</style>
