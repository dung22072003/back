//Trang chi tiết bài viết


<template>
  <div class="container py-4">
    <div v-if="post">
      <h2 class="mb-3 text-info">{{ post.title }}</h2>
      <img :src="post.img" :alt="post.title" class="img-fluid rounded mb-4 shadow-sm" />

      <p class="lead">{{ post.desc }}</p>

      <!-- 🔹 Thông tin mở rộng -->
      <div class="mt-4">
        <h5 class="text-primary">📌 Lợi ích chính</h5>
        <ul class="list-group mb-3">
          <li v-for="(benefit, index) in post.benefits" :key="index" class="list-group-item">
            ✅ {{ benefit }}
          </li>
        </ul>

        <h5 class="text-primary">📅 Thời gian khuyến nghị</h5>
        <p>{{ post.schedule }}</p>

        <h5 class="text-primary">👨‍⚕️ Lời khuyên chuyên gia</h5>
        <blockquote class="blockquote fst-italic">
          "{{ post.advice }}"
        </blockquote>
      </div>

      <!-- 🔹 Nút quay lại -->
      <router-link to="/" class="btn btn-outline-secondary mt-4">
        ← Quay lại trang chủ
      </router-link>
    </div>

    <div v-else>
      <h4 class="text-danger">Không tìm thấy bài viết</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  data() {
    return {
      post: null,
      allPosts: [
        {
          title: 'Phương pháp tập Pilates giúp phục hồi chấn thương cột sống',
          desc: 'Ngoài việc giúp vóc dáng săn chắc, Pilates còn hỗ trợ điều trị hiệu quả...',
          img: new URL('@/assets/images/tap-piltes.jpg', import.meta.url).href,
          benefits: [
            'Giảm đau lưng và cải thiện tư thế',
            'Tăng cường cơ bụng và cơ lưng',
            'Giúp thư giãn và giảm căng thẳng'
          ],
          schedule: 'Tập 3 buổi/tuần, mỗi buổi 45 phút',
          advice: 'Hãy bắt đầu từ các bài tập nhẹ và tăng dần độ khó theo thời gian.'
        },
        {
          title: 'Những gì 1 giờ tập Pilates có thể làm cho cơ thể',
          desc: 'Được thiết kế kỹ lưỡng giúp bạn săn chắc hơn, khỏe hơn chỉ trong 1 giờ...',
          img: new URL('@/assets/images/tap-pilates1.jpg', import.meta.url).href,
          benefits: [
            'Đốt cháy calo hiệu quả',
            'Tăng độ linh hoạt và sức bền',
            'Cải thiện tâm trạng và giấc ngủ'
          ],
          schedule: 'Tập 1 giờ mỗi ngày vào buổi sáng hoặc chiều',
          advice: 'Nên kết hợp với chế độ ăn uống lành mạnh để đạt hiệu quả tối đa.'
        },
        {
          title: 'Pilates có thể cải thiện sức khỏe tim mạch',
          desc: 'Tăng cường thể lực, cải thiện huyết áp và tim mạch nhờ luyện tập điều độ...',
          img: new URL('@/assets/images/tim-mach.jpg', import.meta.url).href,
          benefits: [
            'Ổn định huyết áp',
            'Tăng cường tuần hoàn máu',
            'Giảm nguy cơ bệnh tim'
          ],
          schedule: 'Tập 4 buổi/tuần, kết hợp đi bộ nhẹ',
          advice: 'Người lớn tuổi nên tham khảo bác sĩ trước khi bắt đầu.'
        },
        {
          title: 'EAT CLEAN: Nên và không nên ăn gì?',
          desc: 'Giữ dáng và làn da khoẻ mạnh bằng cách ăn đúng cách...',
          img: new URL('@/assets/images/eat-clean.png', import.meta.url).href,
          benefits: [
            'Giảm mỡ thừa và tăng năng lượng',
            'Làm đẹp da và tóc',
            'Tăng sức đề kháng tự nhiên'
          ],
          schedule: 'Ăn 5–6 bữa nhỏ mỗi ngày, tránh thực phẩm chế biến sẵn',
          advice: 'Luôn đọc kỹ thành phần dinh dưỡng trước khi mua thực phẩm.'
        }
      ]
    }
  },
  created() {
    const id = parseInt(this.$route.params.id)
    this.post = this.allPosts[id] || null
  }
}
</script>
