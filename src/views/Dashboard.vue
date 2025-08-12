//nơi bạn hiển thị cả danh sách người dùng và quản trị viên bằng cách nhúng hai component
<template>
  <div>
    <UserList />
    <AdminList />
  </div>
</template>

<script>
import UserList from './UserList.vue'
import AdminList from './AdminList.vue'

export default {
  name: 'UserAdminList',
  components: {
    UserList,
    AdminList,
  },
}
</script>
