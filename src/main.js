import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Set development/production mode
PROD = process.env.NODE_ENV === 'production';
Vue.config.productionTip = !PROD;
if (!PROD) {
  console.log('!! DEV ENV !!');
}

// Load site dynmaic data
fetch('data/siteContent.json')
  .then(response => response.json()
    .then(data => {
      Vue.prototype.$siteContent = data;
        new Vue({
          router,
          render: h => h(App)
        }).$mount("#app")
      }
    )
  );
