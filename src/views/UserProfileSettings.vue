//chỉnh sửa thông tin cá nhân
//Lưu thông tin vào Pinia store



<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4">Cài Đặt Thông Tin Cá Nhân</h3>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="saveProfile">
          <div class="mb-3">
            <label class="form-label">Họ và tên</label>
            <input v-model="name" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Email / Tổ chức</label>
            <input v-model="email" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Câu nói yêu thích</label>
            <input v-model="quote" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Ảnh đại diện</label>
            <input type="file" class="form-control" @change="handleImageUpload" />
            <div v-if="avatarPreview" class="mt-3 text-center">
              <img :src="avatarPreview" class="rounded-circle" style="width:100px;height:100px;object-fit:cover;" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Lưu thông tin</button>
        </form>

        <div v-if="showSuccess" class="alert alert-success mt-3 text-center">
          ✅ Thông tin đã được lưu!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/router/useUserStore'

const userStore = useUserStore()

// Khởi tạo dữ liệu từ store
const name = ref(userStore.name)
const email = ref(userStore.email)
const quote = ref(userStore.quote)
const avatarPreview = ref(userStore.avatar)

const showSuccess = ref(false)

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      avatarPreview.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

function saveProfile() {
  userStore.updateUser({
    name: name.value,
    email: email.value,
    quote: quote.value,
    avatar: avatarPreview.value
  })
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
</script>
