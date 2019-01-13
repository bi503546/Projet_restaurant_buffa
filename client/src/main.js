import Vue from 'vue';
 
import VueRouter from 'vue-router';
 
import App from './App.vue';

import Restaurant from './components/Restaurant.vue';
 
import Detail from "./components/Detail.vue";

import Menu from "./components/Menu.vue";
 
// Définition des routes
 
Vue.use(VueRouter);
 
 
const routes = [
 
  
    { path: "/detail/:id", component: Detail },
    { path : "/menu", component: Menu}
 
]
 
 
const router = new VueRouter({
 
    routes: routes,
 
    mode:'history'
 
})
 
// La ligne ci-dessous rend le composant User utilisable
 
// partout, dans tous les fichiers .vue
 
// C'est un GLOBAL COMPONENT
 
Vue.component("app-user", Restaurant);

  
  Vue.component("app-restau-detail", {
    props: ["name","cuisine", "building", "street", "zipcode", "borough"],
    template: `
    <div>
      <p>
        Restaurant : {{name}}
      </p>
      <p>
        Cuisine : {{cuisine}}
      </p>
      <p>
        Adresse : {{building}}, {{street}} {{zipcode}} {{borough}}
      </p>
    </div>
      `
  }); 
 
 
new Vue({
 
el: '#app',
 
router:router,
 
render: h => h(App)
 
})
