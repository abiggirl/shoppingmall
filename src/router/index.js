import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// const Home = () =>
//     import ('../views/home/Home')
// const Cart = () =>
//     import ('../views/cart/Cart')
// const Category = () =>
//     import ('../views/category/Category')
// const Profile = () =>
//     import ('../views/profile/Profile')

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('views/home/Home.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () =>
            import ('views/cart/Cart.vue')
    },
    {
        path: '/category',
        name: 'Category',
        component: () =>
            import ('views/category/Category.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ('views/profile/Profile.vue')
    },
    {
        path: '/detail/:iid',
        name: 'Detail',
        component: () =>
            import ('views/detail/Detail.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    // process.env.BASE_URL
    routes
})

export default router

//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }

// import Vue from 'vue'
// import Router from 'vue-router'

// const Home = () =>
//     import ('../views/home/Home')
// const Cart = () =>
//     import ('../views/cart/Cart')
// const Category = () =>
//     import ('../views/category/Category')
// const Profile = () =>
//     import ('../views/profile/Profile')

// Vue.use(Router)

// const routes = [{
//         path: '/',
//         redirect: '/home'
//     },
//     {
//         path: '/home',
//         component: Home
//     },
//     {
//         path: '/cart',
//         component: Cart
//     },
//     {
//         path: '/category',
//         component: Category
//     },
//     {
//         path: '/profile',
//         component: Profile
//     }
// ]
// export default new Router({
//     routes
// })
