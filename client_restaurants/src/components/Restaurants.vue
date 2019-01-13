<template>
  <div id="app">
    <h1>Gestion de restaurants</h1>

    <img src="seperateur.png" alt="">
    <h1>Total des restaurants : {{nbRestaurants}}</h1>
    <br>
    <div >
      <form v-on:submit="ajouterRestaurant" v-if="addForm">
        <h2>Ajout Resataurant : </h2>
        <label>
          Nom : <input type="text" name="nom" required v-model="nom">
        </label>
        <br><br>
        <label>
          Cuisine : <input type="text" name="cuisine" required v-model="cuisine">
        </label>
        <br>
        <button class="button" type="submit">Ajouter</button>
        <button class="button" type="reset" v-on:click="cancelAjouter">Annuler</button>
      </form>

      <button class="button" v-else v-on:click="formAjouterRestaurant">Nouveau Restaurant </button>
    </div>
    <p>
      <label> Recherche :
        <input type="text" v-on:input="chercherRestaurants" v-model="name">
      </label>
      <br><br>
      <label> Taille de la Page :
        <input type="range" min="5" max="100" step="5" class="slider" id="myRange"
               v-on:input="getRestaurantsFromServer()" v-model="pagesize"> : {{pagesize}}
      </label>
    </p>
    <div class="miseEnFormeTable">
      <app-restau  v-for="r in restaurants" :key="r.id" :restau="r"></app-restau>
    </div>
    <div class="navigation" >
      <button class="button" v-on:click="premierePage" v-bind:class="{active : page === 0}">Page 1</button>
      <button class="button" v-on:click="pagePrecedente" v-if="page > 1"><</button>
      <button class="button active" v-if="page !== 0 && page !== getDernierePage()">{{page+1}}</button>
      <button class="button" v-on:click="pageSuivante" v-if="page < getDernierePage() - 1">></button>
      <button class="button" v-on:click="dernierePage" v-bind:class="{active : page === getDernierePage()}">Page {{getDernierePage()+1}}</button>
    </div>
    <img src="seperateur.png" alt="">
    <div id="modify" v-if="restaurantToModify !== null">
      <h2>Modifier un restaurant</h2>
      <form v-on:submit="modifierRestaurant">
        <label>
          Id: <input type="text" name="_id" v-bind:value="restaurantToModify._id" required disabled>
        </label>
        <label>
          Nom: <input type="text" name="nom" v-bind:value=restaurantToModify.name required >
        </label>
        <label>
          Cuisine: <input type="text" name="cuisine" v-bind:value="restaurantToModify.cuisine" required >
        </label>

        <button class="button" type="submit">Modifier</button>
        <button class="button" type="reset" v-on:click="cancelModifier">Annuler</button>
      </form>
    </div>
  </div>
</template>

<script>

import AppRestau from './AppRestau'

import Vue from 'vue'
import VueLodash from 'vue-lodash'
const options = { name: '_' }
Vue.use(VueLodash, options)

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
  mounted () {
    console.log('AVANT AFFICHAGE')
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
    },

    async formModifierRestaurant (id) {
      this.restaurantToModify = await this.getRestaurant(id)
      console.log('a modifier : ' + this.restaurantToModify._id)
    },

    async getRestaurant (id) {
      let url = SERVER_URL + RESOURCE + '/' + id
      let response = await fetch(url)
      let ob = await response.json()
      let res = ob.restaurant
      return res
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

    ajouterRestaurant (event) {
      event.preventDefault()
      let dataFormulaire = new FormData(event.target)

      let url = SERVER_URL + RESOURCE

      fetch(url, {
        method: 'POST',
        body: dataFormulaire
      })
        .then((reponseJSON) => {
          reponseJSON.json()
            .then((reponseJS) => {
              console.log(reponseJS.msg)
              this.getRestaurantsFromServer()
            })
        })
        .catch((err) => {
          console.log(err)
        })

      this.addForm = false
    },

    async modifierRestaurant (event) {
      event.preventDefault()
      let dataFormulaire = new FormData(event.target)
      let id = (event.target)._id.value

      let url = SERVER_URL + RESOURCE + '/' + id

      await fetch(url, {
        method: 'PUT',
        body: dataFormulaire
      })
        .then((responseJSON) => {
          responseJSON.json()
            .then((res) => {
              console.log(res.msg)
            })
        })
        .catch((err) => {
          console.log(err)
        })
      this.restaurantToModify = null
      this.getRestaurantsFromServer()
    },

    getColor (index) {
      return (index % 2) ? 'white' : 'lightgrey'
    },

    pagePrecedente () {
      if (this.page > 1) {
        this.page--
      }
      this.getRestaurantsFromServer()
    },

    pageSuivante () {
      if (this.page < this.getDernierePage()) {
        this.page++
      }
      this.getRestaurantsFromServer()
      console.log(this.page)
    },

    premierePage () {
      this.page = 0
      this.getRestaurantsFromServer()
    },

    dernierePage () {
      this.page = this.getDernierePage()
      this.getRestaurantsFromServer()
    },

    getDernierePage () {
      let res = (Math.ceil(this.nbRestaurants / this.pagesize) - 1)
      return parseInt(res)
    },

    chercherRestaurants: _.debounce(function () {
      this.page = 0
      this.getRestaurantsFromServer()
    }, 300),

    formAjouterRestaurant () {
      this.addForm = true
    },

    cancelModifier () {
      this.restaurantToModify = null
    },

    cancelAjouter () {
      this.addForm = false
    }
  }
}
</script>

<style>

</style>
