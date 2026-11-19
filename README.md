# TOCFL Mock Test (Band B)

Web tự luyện thi TOCFL: Nghe và Đọc, chấm điểm, chữa bài kèm script và giải thích, lịch sử làm bài, sổ từ vựng và flashcard.

Đây là trang tĩnh (HTML/CSS/JS), không cần server hay cơ sở dữ liệu, nên chạy được miễn phí trên **GitHub Pages**.

## Cấu trúc thư mục

```
index.html            Trang chính. Mỗi đề là một dòng <script> ở cuối file
css/style.css         Giao diện
js/app.js             Logic: làm bài, chấm điểm, chữa bài, lịch sử, flashcard
data/config.js        Thang điểm, ngưỡng B1/B2, thời gian làm bài Đọc
data/tests/de-1.js    Nội dung Đề 1: câu hỏi, đáp án, script, giải thích
audio/de-1/           File nghe của Đề 1
images/de-1/          Hình trong bài Đọc (quảng cáo, thư, sổ tay…)
```

## Đưa lên GitHub Pages (không cần biết code)

1. Tạo tài khoản tại https://github.com nếu chưa có.
2. Bấm **New repository**, đặt tên (ví dụ `tocfl-mock`), chọn **Public**, bấm **Create repository**.
   GitHub Pages miễn phí chỉ dùng được với repo Public.
3. Trong repo mới, bấm **uploading an existing file**. Kéo thả **toàn bộ nội dung bên trong** thư mục `tocfl-mock` vào (gồm `index.html`, `css`, `js`, `data`, `audio`, `images`), rồi bấm **Commit changes**.
   - Mỗi lần web chỉ nhận tối đa 100 file. Nếu bị báo lỗi, hãy tải `audio` lên riêng một đợt.
4. Vào **Settings → Pages**. Ở mục *Source*, chọn **Deploy from a branch**, branch `main`, thư mục `/ (root)`, rồi bấm **Save**.
5. Chờ 1–2 phút. Trang web sẽ có địa chỉ dạng `https://<tên-tài-khoản>.github.io/tocfl-mock/`.

> ⚠️ Repo để Public thì ai có link cũng xem được đề và audio. Bạn không nên chia sẻ link nếu đề có bản quyền.

## Dữ liệu cá nhân được lưu ở đâu?

Lịch sử làm bài và sổ từ được lưu **trong trình duyệt** đang dùng (localStorage), không gửi lên đâu cả.
- Mỗi trình duyệt hoặc máy có dữ liệu riêng.
- Xóa dữ liệu duyệt web thì dữ liệu này cũng mất. Hãy vào **Lịch sử → Xuất file sao lưu** định kỳ. Khi đổi máy, dùng **Nhập file sao lưu**.

## Thêm đề mới

Gửi Claude thư mục đề (đề PDF, audio, đáp án, script) và nhờ thêm vào. Claude sẽ tạo:
- `data/tests/de-2.js`
- `audio/de-2/…`, `images/de-2/…`
- thêm một dòng `<script src="data/tests/de-2.js"></script>` vào `index.html`

Sau đó bạn tải các file mới lên GitHub như bước 3.

## Chạy thử trên máy

Mở Terminal trong thư mục này rồi chạy `python3 -m http.server 8000`, sau đó mở http://localhost:8000.

## Về điểm số

- Điểm /80 = số câu đúng × 80 / 50. Đây chỉ là ước lượng tuyến tính, vì TOCFL thật quy đổi theo IRT và không công bố bảng quy đổi.
- Ngưỡng tham khảo (chỉnh được trong `data/config.js`):
  - Nghe: B1 41, B2 61
  - Đọc: B1 46, B2 64

  Nên đối chiếu với thông báo mới nhất trên tocfl.edu.tw.
