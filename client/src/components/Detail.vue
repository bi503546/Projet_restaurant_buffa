<template>
<div>

    <h1 class="title">Detail du restaurant</h1>
    <app-restau-detail
        v-bind:name="restau['name']"
        v-bind:cuisine="restau['cuisine']"
        v-bind:building="address['building']"
        v-bind:street="address['street']"
        v-bind:zipcode="address['zipcode']"
        v-bind:borough="restau['borough']">
		</app-restau-detail>
    <div class="Menu">
          <router-link to="`/menu/${restaurant._id}`">afficher le Menu</router-link>
    </div>
</div>
</template>
<script>
export default
{
  data()
  {
    return {
      restaurant: [],
      cuisine: "",
      id:"",
      name: "",
      building: "",
      street: "",
      zipcode: "",
      borough: "",
      
      restau: {
        name: "",
        cuisine: "",
        borough: ""
      },
      address: {
        building: "",
        street: "",
        zipcode: ""
      },
			url:""
    };
  
  },
  mounted()
  {
    this.restauGetId();
    console.log("AVANT AFFICHAGE");
		this.getRestaurantsFromServer();
  },
  methods:
  {
    getRestaurantsFromServer()
    {
		let url ="http://localhost:8080/" + "api/restaurants" + "/"+ this.id;
		fetch(url)
			.then(reponseJSON =>
			{
				return reponseJSON.json();
			})
			.then(reponseJS =>
			{
				this.restaurant = reponseJS.restaurant;
        this.restau["name"] = this.restaurant.name;
				this.restau["cuisine"] = this.restaurant.cuisine;
				this.restau["borough"] = this.restaurant.borough;
				if( this.restaurant.address )
				{
					this.address["building"] = this.restaurant.address.building;
					this.address["street"] = this.restaurant.address.street;
          this.address["zipcode"] = this.restaurant.address.zipcode;
        }
			})
			.catch( err => console.error("Une erreur est intervenue " + err ) );
    },
    restauGetId()
	  {
      var DonneesRestau = document.location.href.split("/");
      this.id = DonneesRestau[4];
    }, 
  }
};

</script>

<style>

    .title{
        color : red;
    }
    .Menu {
      color : black;
    }
</style>