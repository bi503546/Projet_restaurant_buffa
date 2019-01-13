<template>
  <div id="app">
    <md-card v-on:click.native="getDetail">
      <md-card-header>
        <strong><i>{{restau.name}}</i></strong>
      </md-card-header>
      <md-card-content>
        Nom : {{restau.name}} <br/>
        Cuisine : {{restau.cuisine}}
        <app-restau-detail v-if="detail === true" :restau="restau"></app-restau-detail>
        <img src="../css/img/up.png" class="fleche" v-if="detail === true">
        <img src="../css/img/down.png" class="fleche" v-if="detail === false">
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
    getDetail () {
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
