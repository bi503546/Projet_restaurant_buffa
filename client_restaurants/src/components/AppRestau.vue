<template>
  <div id="app">
    <md-card>
      <md-card-header>
        <strong><i>{{restau.name}}</i></strong>
      </md-card-header>
      <md-card-content>
        Type de cuisine : {{restau.cuisine}}
        <a class ="imageMod" href="#modify">
            <img src="../css/img/edit.png" width="30" v-on:click="modify()"/> Modifier</a>
        <img class ="imageSupp" src="../css/img/delete.png" width="20" v-on:click="supprimerRestaurant(restau._id)">
        <div v-if="detail === true">
          Adresse : {{restau.address.building}} {{restau.address.street}}, {{restau.borough}} {{restau.address.zipcode}}
          <br>
          <router-link :to="{ name: 'details', params: { id: restau._id }}">Plus de détails</router-link>
          <router-link :to="{ name: 'menu', params: { id: restau._id }}">Menu</router-link>

        </div>
        <img src="../css/img/up.png" class="fleche" v-if="detail === true" v-on:click="collapse">
        <img src="../css/img/down.png" class="fleche" v-else v-on:click="collapse">
      </md-card-content>
    </md-card>
  </div>
</template>

<script>

import AppRestauDetail from './AppRestauDetail'

let SERVER_URL = 'http://localhost:8080/'
let RESOURCE = 'api/restaurants'

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
    },

    supprimerRestaurant (id) {
      let url = SERVER_URL + RESOURCE + '/' + id

      fetch(url, {
        method: 'DELETE'
      })
        .then((responseJSON) => {
          responseJSON.json()
            .then((res) => {
              console.log(res.msg)
              this.getRestaurantsFromServer()
            })
        })
        .catch((err) => {
          console.log(err)
        })
    },

    modify () {
      this.$emit('toModify', this.restau._id)
    }
  }
}
</script>

<style>
.fleche {
  width: 20px;
  float: right;
}
.imageMod {
  position : absolute;
  top : 8%;
  left : 30%;
}
.imageSupp {
  position : absolute;
  top : 8%;
  right : 2%;
}
</style>
