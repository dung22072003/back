<template>
  <div class="container mt-5">
    <h2>👤 Thông tin người dùng</h2>

    <!-- Các nút điều hướng -->
    <router-link to="/profile/info" class="btn btn-outline-primary me-2">Thông tin</router-link>
    <router-link to="/profile/settings" class="btn btn-outline-secondary me-2">Cài đặt</router-link>
    <router-link to="/admin/user-list" class="btn btn-outline-success">📋 Danh sách User Admin</router-link>

    <!-- Nội dung động -->
    <router-view class="mt-4" />
  </div>
</template>
