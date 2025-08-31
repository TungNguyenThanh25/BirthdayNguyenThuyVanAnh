# 🎂 Website Sinh Nhật Đặc Biệt - Vân Anh (Ariel)

Một website sinh nhật cực kỳ đặc biệt và đẹp mắt được thiết kế dành riêng cho **Nguyễn Thùy Vân Anh** (biệt danh: Ariel/Mẫn Mẫn) với ngày sinh **6/9/2004**.

## ✨ Tính Năng Đặc Biệt

### 🎨 Thiết Kế UI/UX

- **Theme biển nắng đẹp**: Khung cảnh đại dương với bầu trời xanh, mây trắng, mặt trời rực rỡ
- **Màu sắc chủ đạo**: Xanh dương biển, vàng nắng, cát ấm áp theo sở thích của Vân Anh
- **Gradient effects**: Sử dụng các gradient xanh biển và vàng nắng đẹp mắt
- **Glassmorphism**: Hiệu ứng kính mờ với backdrop-filter
- **Responsive design**: Tối ưu cho mọi thiết bị

### 🌊 Hiệu Ứng Animation Biển

- **Ocean waves**: Sóng biển chuyển động tự nhiên với nhiều lớp
- **Sun and clouds**: Mặt trời rực rỡ và mây bay lượn
- **Floating sea elements**: Vỏ sò, sao biển, cá, ngôi sao bay lượn
- **Sea bubbles**: Bong bóng biển khi tương tác
- **Typing effect**: Hiệu ứng đánh chữ cho text

### 🎯 Logic Thông Minh

- **Birthday time check**: Kiểm tra thời gian sinh nhật chính xác
- **Progressive access**: Mở dần nội dung theo thời gian
- **Two-page structure**: Tách biệt trang đếm ngược và trang chúc mừng

### 🎵 Tính Năng Âm Nhạc

- **Background music**: Phát nhạc nền tự động
- **Music controls**: Nút play/pause đẹp mắt
- **Autoplay**: Tự động phát nhạc khi click vào trang

### 💎 Hang Pha Lê Tương Tác

- **Interactive crystals**: Click vào pha lê để thắp sáng
- **Wish messages**: Hiển thị lời chúc may mắn
- **Visual feedback**: Hiệu ứng sáng và bong bóng biển
- **Completion reward**: Thông báo khi hoàn thành tất cả lời chúc

## 🚀 Cách Sử Dụng

### 1. Cài Đặt

- Tải tất cả file về cùng một thư mục
- Mở `countdown.html` để bắt đầu (trang đếm ngược)

### 2. Cấu Trúc 2 File

#### 📅 **File 1: countdown.html**

- **Mục đích**: Trang đếm ngược đến sinh nhật
- **Tính năng**:
  - Chặn hoàn toàn scroll và navigation
  - Countdown timer chính xác đến giây
  - Khung cảnh biển nắng đẹp
  - Chỉ hiện nút chuyển trang khi đến đúng 00:00 ngày 6/9/2025

#### 🎉 **File 2: birthday.html**

- **Mục đích**: Trang chúc mừng sinh nhật chính
- **Tính năng**:
  - Nội dung đầy đủ các chương
  - Hang pha lê sáng đẹp (thay thế hang tối om)
  - Tương tác hoàn chỉnh
  - Chỉ có thể truy cập sau khi đếm ngược xong

### 3. Tùy Chỉnh

- **Thay đổi tên**: Đã cập nhật thành "Nguyễn Thanh Tùng"
- **Thay đổi nhạc**: Thay đổi đường dẫn file nhạc trong `birthday.html`
- **Thay đổi ngày sinh**: Sửa ngày trong `countdown-script.js` (dòng 47)

### 4. Tính Năng

- **Scroll**: Cuộn để khám phá các chương (chỉ ở trang birthday)
- **Click pha lê**: Nhận lời chúc may mắn
- **Music player**: Điều khiển nhạc nền
- **Responsive**: Tự động điều chỉnh theo màn hình

## 🎯 Cấu Trúc Website

### 📱 Hero Section

- Tiêu đề chính với hiệu ứng gradient vàng nắng
- Countdown timer đến sinh nhật (chỉ ở trang countdown)
- Floating sea elements (vỏ sò, sao biển, cá, ngôi sao)
- Nút "Bắt đầu khám phá" (chỉ ở trang birthday)

### 🌊 Chương 1: Chúc Mừng Sinh Nhật

- Lời chúc sinh nhật đặc biệt
- Thông điệp về tuổi mới (21 tuổi)

### 🌿 Chương 2: Khu Rừng Thì Thầm

- Danh sách những điều tuyệt vời về Vân Anh
- Hiệu ứng sparkle cho mỗi item (vỏ sò)

### 💎 Chương 3: Hang Pha Lê Lấp Lánh

- **Thay đổi hoàn toàn**: Từ hang tối om sang khung cảnh biển sáng
- **Layout mới**: Grid layout với 8 viên pha lê tròn
- **Màu sắc**: Vàng nắng khi chưa thắp sáng, hồng rực rỡ khi đã thắp sáng
- **Hiệu ứng**: Bong bóng biển và confetti khi click
- **Tương tác**: Click để thắp sáng và nhận lời chúc

### ⭐ Chương 4: Đỉnh Hy Vọng

- Lời chúc cuối cùng
- Chữ ký: Nguyễn Thanh Tùng

## 🛠️ Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: Animations, gradients, glassmorphism, ocean waves
- **JavaScript ES6+**: Interactive features, birthday time logic
- **CSS Grid**: Layout cho hang pha lê
- **CSS Grid/Flexbox**: Responsive layout
- **Web APIs**: Intersection Observer, Audio API

## 🎨 Tùy Chỉnh Màu Sắc

Website sử dụng CSS variables với theme biển nắng đẹp:

```css
:root {
  --ocean-deep: #0a4b78; /* Xanh biển sâu */
  --ocean-medium: #1e88e5; /* Xanh biển trung */
  --ocean-light: #42a5f5; /* Xanh biển nhạt */
  --sun-gold: #ffd700; /* Vàng nắng */
  --sun-orange: #ffa500; /* Cam nắng */
  --sand-warm: #f4a460; /* Cát ấm */
  --sky-blue: #87ceeb; /* Xanh trời */
}
```

## 📱 Responsive Design

- **Desktop**: Tối ưu cho màn hình lớn
- **Tablet**: Điều chỉnh layout cho tablet
- **Mobile**: Tối ưu cho điện thoại di động

## 🎵 Âm Nhạc

Để thêm nhạc nền:

1. Đặt file nhạc vào thư mục dự án
2. Sửa đường dẫn trong `birthday.html`:

```html
<source src="path/to/your/music.mp3" type="audio/mpeg" />
```

## 🌟 Tính Năng Đặc Biệt

### Birthday Time Logic

- **Kiểm tra thời gian**: Tự động kiểm tra ngày sinh nhật chính xác
- **Progressive access**: Mở dần nội dung theo thời gian
- **Two-page structure**: Tách biệt hoàn toàn trang đếm ngược và chúc mừng

### Ocean Waves System

- **Dynamic waves**: Tạo sóng biển động với nhiều lớp
- **Wave animation**: Chuyển động tự nhiên và mượt mà
- **Performance optimized**: Tối ưu hiệu suất

### Crystal Cave Redesign

- **Layout mới**: Grid layout thay vì canvas tối
- **Màu sắc sáng**: Vàng nắng và hồng rực rỡ
- **Hiệu ứng đẹp**: Bong bóng biển và confetti
- **Tương tác tốt**: Click dễ dàng và phản hồi nhanh

## 💝 Lời Nhắn

Website này được thiết kế với tất cả tình cảm và sự chân thành, mong muốn mang đến cho Vân Anh một ngày sinh nhật thật đặc biệt và đáng nhớ. Mỗi chi tiết đều được chăm chút kỹ lưỡng để tạo nên một trải nghiệm hoàn hảo.

**Chúc Vân Anh một ngày sinh nhật thật vui vẻ, hạnh phúc và đáng nhớ! 🎉✨**

---

_Được tạo với ❤️ và nhiều tình cảm đặc biệt bởi Nguyễn Thanh Tùng_
