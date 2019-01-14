<template>
  <div id="app">
    <h1 class="title">Menu du restaurant</h1>
    <table class="table">
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
    <table class="table">
			<tr class="title">
				<th>Plats Principaux</th>
				<th>Prix</th>
			</tr>
			<tbody>
				<tr class="content" v-for="p,index in platsPrincipals">
                    <td>{{ p.titre }}</td>
                    <td>{{ p.prix }} euros</td>
				</tr>
			</tbody>
		</table>
    <table class="table">
			<tr class="title">
				<th>Dessert</th>
				<th>Prix</th>
			</tr>
			<tbody>
				<tr class="content" v-for="d,index in dessert">
                    <td>{{ d.titre }}</td>
                    <td>{{ d.prix }} euros</td>
				</tr>
			</tbody>
		</table>
  </div>
</template>

<script>

export default {
  name: 'app-restau-menu',
  props: {
    restau: Object
  },
  mounted () {
    console.log(this.id),
    this.genererEntree();
    this.genererPlat();
    this.genererDessert();
  },
  data: function () {
    return {
      menu: false,
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
      },
      listPlats: {
          titre :[
            "Hamburger maison, comme aux USA",
            "Meat Pie (tourte au boeuf) Poulet au cidre",
            "Farce pour volaille",
            "Pavé de saumon en croûte de sel. Sauce express pour poisson blanc : moutarde-basilic",
            "Toasts aux sardines. Pétoncles sauce curry",
            "Gratin de pâtes au jambon"
          ],
          prix:[
            "17",
            "18",
            "20",
            "12",
            "13",
            "15"
          ]
      },
      Listdessert :{
          titre:[
              "Gâteau de saint Jacques",
              "Sorbet fraise",
              "VACHERIN AUX FRUITS DU TEMPS DE CHRISTOPHE MICHALAK",
              "CHOUX CRÈME ET CITRON VERT",
              "TARTE AU CITRON À LA MERINGUE ITALIENNE",
              "OEUFS À LA NEIGE CRÈME À LA VANILLE",
              "FLAN PARISIEN"
          ],
          prix:[
              "3",
              "4",
              "7",
              "9",
              "8",
              "5",
              "6"
          ]
      }
    };
  },
  methods: {
    getMenu () {
      if (this.menu === true) {
        this.menu = false
      } else {
        this.menu = true
      }
      console.log(this.menu)
    },
     getRandomInt(i) {
        return Math.floor(Math.random() * Math.floor(i));
    },
    genererEntree() {
        
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
      genererPlat(){
        var j;
        var obj = {};        
        var platName = "";
        var price = 0;        
        for(var i= 0; i < 5; i++){
            j = this.getRandomInt(6);
            platName = this.listPlats.titre[j];
            price = this.listPlats.prix[j];
            obj = {'titre' : platName , 'prix': price};
            this.platsPrincipals.push(obj);
            
            
        }
      },
      genererDessert() {
        
        var j;
        var obj = {};        
        var dessertName = "";
        var price = 0;        
        for(var i= 0; i < 5; i++){
            j = this.getRandomInt(7);
            dessertName = this.Listdessert.titre[j];
            price = this.Listdessert.prix[j];
            obj = {'titre' : dessertName , 'prix': price};
            this.dessert.push(obj);
            
            
        }
        
      },
}
}
</script>

<style>
    h1 {

    color : grey;
    font-size: 3rem;
    font-family: Roboto;
    font-style: italic;
    text-align: center;
}

</style>
