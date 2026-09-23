import Vue from 'vue';
import VueRouter from 'vue-router';
import ViewHome from '../views/Home.vue';
import ViewPreview from '../views/Preview.vue';
import ViewBook from '../views/Book.vue';
import ViewLearn from '../views/Learn.vue';
import ViewExercise from '../views/Exercise.vue';
import ViewSchools from '../views/Schools.vue';
import ViewContact from '../views/Contact.vue';
import ViewPlay from '../views/Play/Play.vue';
import ViewShop from '../views/Shop.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   component: ViewPreview
  // },
  // {
  //   path: '/home',
  //   component: ViewHome
  // },
  {
    path: '/',
    component: ViewHome
  },
  {
    path: '/book/:type?',
    component: ViewBook,
    props: true
  },
  {
    path: '/learn/:type?',
    component: ViewLearn,
    props: true
  },
  {
    path: '/learn/worksheet/:pageNum',
    component: ViewExercise,
    props: true
  },
  {
    path: '/learn/play/:songUrl',
    component: ViewPlay,
    props: true
  },
  {
    path: '/schools',
    component: ViewSchools
  },
  {
    path: '/contact',
    component: ViewContact
  },
  {
    path: '/shop/:state?',
    component: ViewShop,
    props: true
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior(r) {
    return {
      x: 0,
      y: 0
    }
  }
});

export default router;
