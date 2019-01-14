<template>
  <div id="app">
    <md-card>
      <md-card-header>
        <strong><i>{{restau.name}}</i></strong>
      </md-card-header>
      <md-card-content>
        Type de cuisine : {{restau.cuisine}}
        <a class ="imageMod" href="#modify">
            <img class="imageMod" src="https://cdn.icon-icons.com/icons2/931/PNG/512/edit_modify_icon-icons.com_72390.png" width="30" v-on:click="formModifierRestaurant(r._id)"/>
        Modifier</a>
        <img class ="imageSupp" src="https://cdn.icon-icons.com/icons2/868/PNG/512/trash_bin_icon-icons.com_67981.png" width="20" v-on:click="supprimerRestaurant(r._id)">
        <div v-if="detail === true">
          Adresse : {{restau.address.building}} {{restau.address.street}}, {{restau.borough}} {{restau.address.zipcode}}
          <br>
          <md-button ><router-link :to="{ name: 'DétailsRestaurant', params: { id: restau._id }}">Plus de détails</router-link></md-button>
          <md-button v-on:click.native="getMenu">Menu</md-button>
          <img src="https://cdn.icon-icons.com/icons2/931/PNG/512/edit_modify_icon-icons.com_72390.png"
               width="30" v-on:click="formModifierRestaurant(r._id)"/>

          <img src="https://cdn.icon-icons.com/icons2/868/PNG/512/trash_bin_icon-icons.com_67981.png"
               width="20" v-on:click="supprimerRestaurant(r._id)"/>

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
