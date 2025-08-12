<template>
  <Teleport to="body">
    <div class="modal fade" :class="{ show: showModal }" tabindex="-1" style="display: block;" v-if="showModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form @submit.prevent="handleSubmit">
            <div class="modal-header">
              <h5 class="modal-title">📝 Đăng Bài Viết Mới</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="postTitle" class="form-label">Tiêu đề</label>
                <input v-model="title" type="text" class="form-control" id="postTitle" required>
              </div>
              <div class="mb-3">
                <label for="postContent" class="form-label">Nội dung</label>
                <textarea v-model="content" class="form-control" id="postContent" rows="5" required></textarea>
              </div>
              <div class="mb-3">
                <label for="postImage" class="form-label">Hình ảnh minh họa</label>
                <input @change="handleImageUpload" type="file" class="form-control" id="postImage" accept="image/*">
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Đăng bài</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ showModal: Boolean })
const emit = defineEmits(['close', 'submit'])

const title = ref('')
const content = ref('')
const imageFile = ref(null)

const closeModal = () => emit('close')

const handleImageUpload = (event) => {
  imageFile.value = event.target.files[0]
}

const handleSubmit = () => {
  if (!title.value || !content.value) {
    alert('Vui lòng nhập đầy đủ thông tin bài viết.')
    return
  }

  const postData = {
    title: title.value,
    content: content.value,
    image: imageFile.value
  }

  emit('submit', postData)
  alert('Bài viết đã được gửi (giả lập)')
  closeModal()
}
</script>
