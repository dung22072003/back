// chi tiết bài viết 


<template>
  <div class="container">
    <!-- 🔷 Tiêu đề -->
    <h2 class="mb-4 text-white bg-success p-3 rounded">Tất cả bài viết</h2>

    <!-- 🔷 Danh sách bài viết -->
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div v-for="(post, index) in posts" :key="index" class="col">
        <div class="card h-100 shadow-sm">
          <img :src="post.img" class="card-img-top" :alt="post.title" />
          <div class="card-body">
            <h5 class="card-title">
              <router-link :to="{ name: 'BlogPost', params: { id: index } }" class="text-decoration-none">
                {{ post.title }}
              </router-link>
            </h5>
            <p class="card-text">{{ post.desc }}</p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted">
              {{ commentStore.getComments(post.title).length }} bình luận
            </small>
            <button class="btn btn-sm btn-outline-primary" @click="openCommentModal(index)">
              💬 Bình luận
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔷 Bài viết của tôi -->
    <h3 class="mt-5 mb-3">Bài viết của tôi</h3>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <div class="card h-100 border-success shadow-sm">
          <img :src="myPostImage" class="card-img-top" alt="My Post" />
          <div class="card-body">
            <h5 class="card-title">Bài viết của tôi</h5>
            <p class="card-text">Đây là bài viết bạn đã đăng. Bạn có thể chỉnh sửa hoặc xóa bài viết này.</p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <button class="btn btn-sm btn-warning">Chỉnh sửa</button>
            <button class="btn btn-sm btn-danger">Xóa</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔷 Modal bình luận -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="submitComment">
            <div class="modal-header">
              <h5 class="modal-title">Bình luận: {{ currentPost?.title }}</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Tên người dùng</label>
                <input type="text" class="form-control" v-model="commentUser" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Nội dung bình luận</label>
                <textarea class="form-control" v-model="commentContent" rows="3" required></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <span class="me-auto text-muted">Thời gian: {{ commentTime }}</span>
              <button type="submit" class="btn btn-primary">Gửi bình luận</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
            </div>
          </form>
          <div class="p-3">
            <h6 class="mb-2">Tất cả bình luận</h6>
            <ul class="list-group">
              <li
                v-for="(cmt, i) in commentStore.getComments(currentPost?.title)"
                :key="i"
                class="list-group-item"
              >
                <strong>{{ cmt.user }}</strong>
                <span class="text-muted">({{ cmt.time }})</span><br />
                {{ cmt.content }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCommentStore } from '@/router/useCommentStore'

const commentStore = useCommentStore()

const myPostImage = '/images/my-post.jpg'

const posts = ref([
  {
    title: 'Phương pháp tập Pilates giúp phục hồi chấn thương cột sống',
    desc: 'Ngoài việc giúp vóc dáng săn chắc, Pilates còn hỗ trợ điều trị hiệu quả...',
    img: new URL('@/assets/images/tap-piltes.jpg', import.meta.url).href
  },
  {
    title: 'Những gì 1 giờ tập Pilates có thể làm cho cơ thể',
    desc: 'Được thiết kế kỹ lưỡng giúp bạn săn chắc hơn, khỏe hơn chỉ trong 1 giờ...',
    img: new URL('@/assets/images/tap-pilates1.jpg', import.meta.url).href
  },
  {
    title: 'Pilates có thể cải thiện sức khỏe tim mạch',
    desc: 'Tăng cường thể lực, cải thiện huyết áp và tim mạch nhờ luyện tập điều độ...',
    img: new URL('@/assets/images/tim-mach.jpg', import.meta.url).href
  },
  {
    title: 'EAT CLEAN: Nên và không nên ăn gì?',
    desc: 'Giữ dáng và làn da khoẻ mạnh bằng cách ăn đúng cách...',
    img: new URL('@/assets/images/eat-clean.png', import.meta.url).href
  }
])



const showModal = ref(false)
const currentPostIndex = ref(null)
const currentPost = ref(null)

const commentUser = ref('')
const commentContent = ref('')
const commentTime = ref('')

const openCommentModal = (index) => {
  currentPostIndex.value = index
  currentPost.value = posts.value[index]
  commentTime.value = new Date().toLocaleString()

  commentStore.loadComments(currentPost.value.title)
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  commentUser.value = ''
  commentContent.value = ''
}

const submitComment = () => {
  const newComment = {
    user: commentUser.value.trim(),
    content: commentContent.value.trim(),
    time: new Date().toLocaleString()
  }

  commentStore.addComment(currentPost.value.title, newComment)
  closeModal()
}

onMounted(() => {
  const titles = posts.value.map((post) => post.title)
  commentStore.loadAllComments(titles)
})
</script>
