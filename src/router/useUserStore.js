// Pinia store để quản lý thông tin người dùng
//Lưu trữ thông tin người dùng



import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    name: 'Nguyễn Công Việt',
    email: 'Tổ chức Tư vấn sức khỏe quốc tế độc lập',
    quote: 'Ta không được chọn nơi mình sinh ra, nhưng ta được chọn cách mình sẽ sống',
    avatar: 'images/avatar.png'
  }),
  actions: {
    updateUser(data) {
      this.name = data.name
      this.email = data.email
      this.quote = data.quote
      this.avatar = data.avatar
    }
  }
})
