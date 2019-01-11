
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { auth: true },
    children: [
      { name: 'Welcome Page', path: '', component: () => import('pages/Index.vue') },
      { name: 'Setting User', path: 'user', component: () => import('pages/User.vue') },
      { name: 'Setting News', path: 'news', component: () => import('pages/News.vue') },
      { name: 'Settlement Iuran', path: 'iuran', component: () => import('pages/Iuran.vue') },
      { name: 'Remove Settlement', path: 'settle', component: () => import('pages/Settle.vue') },
      { name: 'History Iuran', path: 'record', component: () => import('pages/Record.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MyLogin.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
