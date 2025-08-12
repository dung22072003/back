<template>
  <div class="modal fade" id="commentModal" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="submitComment">
          <div class="modal-header">
            <h5 class="modal-title">Bình luận bài viết</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="commentUser" class="form-label">Tên người dùng</label>
              <input type="text" class="form-control" id="commentUser" v-model="user" readonly>
            </div>
            <div class="mb-3">
              <label for="commentContent" class="form-label">Nội dung bình luận</label>
              <textarea class="form-control" id="commentContent" v-model="content" rows="3" required></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <span class="me-auto text-muted">Thời gian: {{ time }}</span>
            <button type="submit" class="btn btn-primary">Gửi bình luận</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </form>
        <div class="p-3">
          <h6 class="mb-2">Các bình luận gần đây</h6>
          <ul class="list-group">
            <li v-for="(cmt, index) in comments" :key="index" class="list-group-item">
              <strong>{{ cmt.user }}</strong>
              <span class="text-muted">({{ cmt.time }})</span><br>
              {{ cmt.content }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Modal } from 'bootstrap'

const modalRef = ref(null)
let modalInstance

const user = ref('Nguyễn Văn A')
const content = ref('')
const time = ref('')
const comments = ref([])

const showModal = () => {
  if (!modalInstance) {
    modalInstance = new Modal(modalRef.value)
  }
  modalInstance.show()
}

const submitComment = () => {
  const now = new Date().toLocaleString()
  time.value = now
  comments.value.unshift({
    user: user.value,
    content: content.value,
    time: now
  })
  content.value = ''
}
defineExpose({ showModal })
</script>
