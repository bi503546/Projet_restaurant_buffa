<template>
    <div id="app">

        <div id="entete">
            <h1>Gestion de restaurants</h1>
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
        </div>
        <div class="miseEnFormeTable">
            <table class="labelTable">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Cuisine </th>
                        <th colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="r,index in restaurants" v-bind:style="{backgroundColor:getColor(index)}" v-bind:class="{bordureRouge:(index === 2)}">
                    <td>{{r.name}}</td>
                    <td>{{r.cuisine}}</td>
                    <td class="options">
                    <td>
                    <router-link class="rl" :to="`/detail/${r._id}`">Detail</router-link>
                    </td>
                       <a href="#modify">
                        <img src="https://cdn.icon-icons.com/icons2/931/PNG/512/edit_modify_icon-icons.com_72390.png"
                             width="30" v-on:click="formModifierRestaurant(r._id)"/> Modifier
                        </a>
                    </td>
                    <td class="options">
                       <td class="options">
                    <img src="https://cdn.icon-icons.com/icons2/868/PNG/512/trash_bin_icon-icons.com_67981.png"
                         width="20" v-on:click="supprimerRestaurant(r._id)"/>supprimer
                </td>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="navigation" >
            <button class="button" v-on:click="premierePage" v-bind:class="{active : page === 0}">Page 1</button>
            <button class="button" v-on:click="pagePrecedente" v-if="page > 1"><</button>
            <button class="button active" v-if="page !== 0 && page !== getDernierePage()">{{page+1}}</button>
            <button class="button" v-on:click="pageSuivante" v-if="page < getDernierePage() - 1">></button>
            <button class="button" v-on:click="dernierePage" v-bind:class="{active : page === getDernierePage()}">Page {{getDernierePage()+1}}</button>
        </div>
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
export default {
  data() {
    return {
        restaurants: [],
            nom: '',
            cuisine: '',
            nbRestaurants:0,
            page:0,
            pagesize: 10,
            name:"",
            addForm: false,
            restaurantToModify: null,
        };
    },
        mounted() {
            console.log("AVANT AFFICHAGE");
            this.getRestaurantsFromServer();
        },
        methods: {
             getRestaurantsFromServer() {
                let url = "http://localhost:8080/" + "api/restaurants" +
                    "?page=" + this.page +
                    "&pagesize=" + this.pagesize +
                    "&name=" + this.name;

                fetch(url)
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
                                this.restaurants = reponseJS.data;
                                this.nbRestaurants = reponseJS.count;
                                console.log(reponseJS.msg);
                            });
                    }).catch((err) => {
                        console.log(err);
                    });
                console.log("Page actuelle : " + this.page);
            },

            async formModifierRestaurant(id){
                this.restaurantToModify = await this.getRestaurant(id);
                console.log("a modifier : " + this.restaurantToModify._id);
            },

            async getRestaurant(id) {
                let url = "http://localhost:8080/" + "api/restaurants" + "/" + id;
                let response = await fetch(url);
                let ob = await response.json();
                let res = ob.restaurant;
                return res;
            },

            supprimerRestaurant(id) {
                let url = "http://localhost:8080/" + "api/restaurants" + "/" + id;

                fetch(url, {
                    method: "DELETE",
                })
                    .then((responseJSON) =>{
                        responseJSON.json()
                            .then((res) => {
                                console.log(res.msg);
                                this.getRestaurantsFromServer();
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },

            ajouterRestaurant(event) {
                event.preventDefault();
                let dataFormulaire = new FormData(event.target);

                let url = "http://localhost:8080/" + "api/restaurants";

                fetch(url, {
                    method: "POST",
                    body: dataFormulaire
                })
                    .then((reponseJSON) => {
                        reponseJSON.json()
                            .then((reponseJS) => {
                                console.log(reponseJS.msg);
                                this.getRestaurantsFromServer();
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                this.addForm = false;
            },

            async modifierRestaurant(event) {
                event.preventDefault();
                let dataFormulaire = new FormData(event.target);
                let id = (event.target)._id.value;

                let url = "http://localhost:8080/" + "api/restaurants" + "/" + id;

                await fetch(url, {
                    method: "PUT",
                    body: dataFormulaire
                })
                    .then((responseJSON) => {
                        responseJSON.json()
                            .then((res) => {
                                console.log(res.msg);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                this.restaurantToModify = null;
                this.getRestaurantsFromServer();
            },

            getColor(index) {
                return (index % 2) ? 'white' : 'lightgrey';
            },

            pagePrecedente() {
                if(this.page > 1)
                    this.page--;
                this.getRestaurantsFromServer();
            },

            pageSuivante() {
                if(this.page < this.getDernierePage())
                    this.page++;
                this.getRestaurantsFromServer();
                console.log(this.page);
            },

            premierePage() {
                this.page = 0;
                this.getRestaurantsFromServer();
            },

            dernierePage() {
                this.page = this.getDernierePage();
                this.getRestaurantsFromServer();
            },

            getDernierePage(){
                let res = (Math.ceil(this.nbRestaurants/this.pagesize)-1);
                return parseInt(res);
            },
            
            formAjouterRestaurant(){
                this.addForm = true;
            },

            cancelModifier() {
                 this.restaurantToModify = null;
            },

            cancelAjouter() {
                 this.addForm = false;
            }

  }
};
</script>
<style>
    body {
    background-color: #F1F1F1;
    text-align: center;
}

table {
    border-collapse: collapse;
    max-width: 70%;
    margin: auto;
}

h1 {
    padding: 0;
    margin: 0;
}

th {
    font-size: 150%;
}

td, th {
    width: 10%;
    text-align: left;
}

.options {
    width: 5%;
    text-align: center;
}

label {
    color : #565656;
    padding: 12px 12px 12px 0;
}

input:invalid {
    background-color: #F4C4BE;
}

input:valid {
    background-color: #F1F1F1;
}

.bordureRouge {
    border: 2px dashed red;
}

.button {
    display: inline-block;
    border-radius: 4px;
    background-color: rgb(134, 129, 127);
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 18px;
    padding: 10px;
    max-width: 120px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
}

.button:hover {
    font-weight: bold;
    background-color: #565656;
}
.navigation{
    text-align: center;
    margin: auto;
}

.active, .active:hover {
    background-color: #cccccc;
    color: black;
    transition: none;
    cursor: auto;
}

.active:hover{

}

input[type=text], select, textarea {
    width: 25%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
}
tbody tr:hover {
    background-color:#F09979;
}
.options > img {
    cursor: pointer;
}
</style>