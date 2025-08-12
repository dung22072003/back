//Hiển thị thông tin người dùng
//Lấy dữ liệu từ Pinia store


<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4">Thông Tin Tài Khoản</h3>
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <img :src="user.avatar" class="rounded-circle mb-3" style="width:120px;height:120px;object-fit:cover;" />
        <h5>{{ user.name }}</h5>
        <p class="text-muted">{{ user.email }}</p>
        <blockquote class="fst-italic">"{{ user.quote }}"</blockquote>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/router/useUserStore'
const user = useUserStore()
</script>
