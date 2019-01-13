<template>
<div>

    <h1 class="title">Menu du restaurant</h1>
    <div>
		<table>
			<tr class="title">
				<th>Entrees</th>
				<th>Prix</th>
			</tr>
			<tbody>
				<tr class="content" v-for="e,index in entrees">
                    <td>{{ e.titre }}</td>
                    <td>{{ e.prix }} euros</td>
				</tr>
			</tbody>
		</table>
        
    </div>
            <router-link to="`/detail/${restaurant._id}`">afficher les details</router-link>
    </div>
</template>
<script>
    export default
{
    name:"app-menu-restaurant",
  data()
  {
    return {
      restaurant: [],
      cuisine: "",
      id:"",
      name: "",
      url:"",
      entrees: [],
      platsPrincipals:[],
      dessert:[],
      ListEntree:{
          titre :  [
            "Velouté de courgettes",
            "Crème de brocoli légère aux noisettes",
            "Pâtes aux brocolis",
            "Salade d'avocat au saumon",
            "Soupe patates douces, poireaux et coco",
            "La terrine de sanglier à l'ancienne",
            "Pâtes aux lentilles",
            "Fromage de tête de porc fermier"
          ],
          prix:[
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '4'
          ]
      }
    };
  
  },
  mounted()
  {
    this.restauGetId();
    console.log("AVANT AFFICHAGE");
	this.getRestaurantsFromServer();
    this.genererMenu() ;
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
                
			})
			.catch( err => console.error("Une erreur est intervenue " + err ) );
    },
    restauGetId()
	  {
      var DonneesRestau = document.location.href.split("/");
      this.id = DonneesRestau[4];
    }, 
    getRandomInt(i) {
        return Math.floor(Math.random() * Math.floor(i));
    },
    genererMenu() {
        /*
            creer un tableau avec 5 entrees choisie aléatoirement pour chaque resto
        */
        var j;
        var obj = {};
        var entreeName = "";
        var price = 0;
        for(var i= 0; i < 5; i++){
            j = this.getRandomInt(8);
            entreeName = this.ListEntree.titre[j];
            price = this.ListEntree.prix[j];
            obj = {'titre' : entreeName , 'prix': price};
            this.entrees.push(obj);
            
        }
    },
  }
};
</script>