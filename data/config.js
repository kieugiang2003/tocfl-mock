// Cấu hình thang điểm (có thể chỉnh nếu SC-TOP công bố ngưỡng khác)
window.TOCFL_CONFIG = {
  // Điểm tối đa mỗi kỹ năng ở Band B
  maxScaled: 80,
  // Ngưỡng tham khảo cho từng kỹ năng (điểm quy đổi /80).
  // TOCFL thật dùng điểm quy đổi theo IRT, không công bố bảng quy đổi chính thức,
  // nên điểm ở đây chỉ là ước lượng tuyến tính: điểm = số câu đúng × 80 / 50.
  levels: {
    listening: { B1: 41, B2: 61 },
    reading:   { B1: 46, B2: 64 }
  },
  // Thời gian làm bài Đọc (phút)
  readingMinutes: 60,
  // Mục tiêu cá nhân
  goal: "B1"
};
