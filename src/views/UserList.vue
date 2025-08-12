<template>
  <div class="user-list">
    <h2>👥 Danh sách người dùng</h2>
    <table>
      <thead>
        <tr>
          <th>Họ và Tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Giới tính</th>
          <th>Mật khẩu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ maskPassword(user.password) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      users: [
        {
          id: 1,
          name: 'Nguyễn Văn A',
          email: 'a@example.com',
          phone: '0901234567',
          gender: 'Nam',
          password: 'abc123',
        },
        {
          id: 2,
          name: 'Trần Thị B',
          email: 'b@example.com',
          phone: '0912345678',
          gender: 'Nữ',
          password: 'bcd456',
        },
      ],
    }
  },
  methods: {
    maskPassword(password) {
      return '*'.repeat(password.length)
    },
  },
}
</script>

<style scoped>
.user-list {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: left;
}
</style>
