<template>
  <div>
    <!-- 🔷 Slideshow -->
    <div id="carouselExample" class="carousel slide mb-4" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(banner, index) in banners"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <img :src="banner.src" class="d-block w-100" :alt="banner.alt" />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!-- 🔷 Nội dung chính -->
    <div class="container">
      <section class="row">
        <!-- 🔹 Sidebar -->
        <aside class="col-md-4 mb-4" id="user-section">
          <div class="sidebar-card p-4 mb-4 bg-light rounded shadow-sm">
            <h2 class="text-info mb-3">Về tôi</h2>
            <img :src="avatar" class="img-fluid rounded-circle mb-3" alt="Ảnh đại diện" style="width:100px;" />
            <h5 class="mb-2">TS. Trần Hoàng</h5>
            <p class="mb-2">Tổ chức Tư vấn sức khỏe quốc tế độc lập</p>
            <p class="fst-italic">"Ta không được chọn nơi mình sinh ra, nhưng ta được chọn cách mình sẽ sống"</p>
          </div>

          <div class="sidebar-card p-4 mb-4 bg-light rounded shadow-sm">
            <h4 class="text-info mb-3">Chuyên mục</h4>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Chế độ tập <span class="badge bg-primary rounded-pill">12</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Chế độ dinh dưỡng <span class="badge bg-primary rounded-pill">15</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Cẩm nang cuộc sống <span class="badge bg-primary rounded-pill">99</span>
              </li>
            </ul>

            <h5 class="text-info mb-3">Bài viết nổi bật</h5>
            <ul class="list-group">
              <li v-for="(post, index) in featuredPosts" :key="index" class="list-group-item">
                <div class="d-flex">
                  <img :src="post.img" width="60" height="60" class="me-2 rounded" />
                  <div>
                    <strong>{{ post.title }}</strong><br />
                    <small>{{ post.desc }}</small>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <!-- 🔹 Bài viết chính -->
        <article class="col-md-8" id="article-section">
          <h2 class="mb-4 text-white bg-info p-3 rounded">Blog của tôi</h2>
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div v-for="(post, index) in blogPosts" :key="index" class="col">
              <div class="card h-100 shadow-sm">
                <img :src="post.img" class="card-img-top" :alt="post.title" />
                <div class="card-body">
                  <h5 class="card-title">
                    <a href="#" class="text-decoration-none text-dark">{{ post.title }}</a>
                  </h5>
                  <p class="card-text">{{ post.desc }}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                  <small class="text-muted">
                    {{ commentStore.getComments(post.title).length }} bình luận
                  </small>
                  <button class="btn btn-sm btn-outline-primary" @click="openCommentModal(post.title)">
                    💬 Bình luận
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 🔹 Phân trang -->
          <nav class="mt-4">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled"><a class="page-link" href="#">←</a></li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">→</a></li>
            </ul>
          </nav>
        </article>
      </section>
    </div>

    <!-- 🔷 Modal bình luận -->
    <CommentModal ref="commentModalRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCommentStore } from '@/router/useCommentStore'
import CommentModal from './CommentModal.vue'

const commentStore = useCommentStore()
const commentModalRef = ref(null)

const openCommentModal = (title) => {
  commentModalRef.value?.showModal(title)
}

const avatar = new URL('@/assets/images/avatar.png', import.meta.url).href

const banners = [
  { src: new URL('@/assets/images/banner1.jpg', import.meta.url).href, alt: 'Banner 1' },
  { src: new URL('@/assets/images/banner2.jpg', import.meta.url).href, alt: 'Banner 2' },
  { src: new URL('@/assets/images/banner3.jpg', import.meta.url).href, alt: 'Banner 3' }
]

const featuredPosts = [
  {
    img: new URL('@/assets/images/spinach_300x300.jpg', import.meta.url).href,
    title: 'Lợi ích khi ăn rau mỗi ngày',
    desc: 'Thói quen xanh hàng ngày giúp tăng sức đề kháng...'
  },
  {
    img: new URL('@/assets/images/orange_300x300.jpg', import.meta.url).href,
    title: '9 tác dụng tuyệt vời của quả cam',
    desc: 'Chẳng lo hao mòn miễn dịch, giảm mệt mỏi...'
  },
  {
    img: new URL('@/assets/images/sesameoil_300x300.jpg', import.meta.url).href,
    title: '10 công dụng bất ngờ từ nước ép cà rốt',
    desc: 'Giúp sáng mắt, mượt tóc và bổ sung collagen...'
  }
]

const blogPosts = [
  {
    img: new URL('@/assets/images/tap-piltes.jpg', import.meta.url).href,
    title: 'Phương pháp tập Pilates giúp phục hồi chấn thương cột sống',
    desc: 'Ngoài việc giúp vóc dáng săn chắc, Pilates còn hỗ trợ điều trị hiệu quả...'
  },
  {
    img: new URL('@/assets/images/tap-pilates1.jpg', import.meta.url).href,
    title: 'Những gì 1 giờ tập Pilates có thể làm cho cơ thể',
    desc: 'Được thiết kế kỹ lưỡng giúp bạn săn chắc hơn, khỏe hơn chỉ trong 1 giờ...'
  },
  {
    img: new URL('@/assets/images/tim-mach.jpg', import.meta.url).href,
    title: 'Pilates có thể cải thiện sức khỏe tim mạch',
    desc: 'Tăng cường thể lực, cải thiện huyết áp và tim mạch nhờ luyện tập điều độ...'
  },
  {
    img: new URL('@/assets/images/eat-clean.png', import.meta.url).href,
    title: 'EAT CLEAN: Nên và không nên ăn gì?',
    desc: 'Giữ dáng và làn da khoẻ mạnh bằng cách ăn đúng cách...'
  }
]

onMounted(() => {
  const titles = blogPosts.map(post => post.title)
  commentStore.loadAllComments(titles)
})
</script>

<style scoped>
#carouselExample {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
