import { createRouter, createWebHistory } from 'vue-router'

// 📁 Import các view
import Home from '../views/Home.vue'
import BlogList from '../views/BlogList.vue'
import BlogPost from '../views/BlogPost.vue'
import UserProfile from '../views/UserProfile.vue'
import UserProfileInfo from '../views/UserProfileInfo.vue'
import UserProfileSettings from '../views/UserProfileSettings.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

// ✅ Kiểm tra trạng thái đăng nhập
function isAuthenticated() {
  return localStorage.getItem('auth') === 'true'
}

// ✅ Khai báo các route
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/blog', name: 'BlogList', component: BlogList },
  { path: '/blog/:id', name: 'BlogPost', component: BlogPost },

  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    alias: '/me',
    children: [
      { path: 'info', name: 'UserProfileInfo', component: UserProfileInfo },
      { path: 'settings', name: 'UserProfileSettings', component: UserProfileSettings },
    ],
  },

  // ✅ Route mới: Danh sách User & Admin
  {
    path: '/admin/user-list',
    name: 'UserAdminList',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true } // nếu bạn muốn bảo vệ bằng đăng nhập
  },

  { path: '/login', name: 'Login', component: Login },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
]

// ✅ Tạo router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Route Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

// ✅ Hàm giả lập đăng nhập / đăng xuất
export function authenticateUser() {
  localStorage.setItem('auth', 'true')
}

export function logoutUser() {
  localStorage.removeItem('auth')
}

export default router
