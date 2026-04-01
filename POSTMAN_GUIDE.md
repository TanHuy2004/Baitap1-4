# HƯỚNG DẪN TEST API MESSAGING VỚI POSTMAN

## CÁC BƯỚC CHUẨN BỊ

### 1. Khởi động server
```bash
npm start
```

### 2. Tạo 2 user để test (hoặc sử dụng user có sẵn)

---

## API ENDPOINTS

### ENDPOINT 1: POST /api/v1/messages - GỬI MESSAGE MỚI

**Mục đích:** Gửi message text hoặc file đến một user khác

**Method:** POST
**URL:** `http://localhost:3000/api/v1/messages`

**Headers:**
```
Authorization: Bearer <token_from_login>
Content-Type: application/json
```

**Body (raw JSON):**

**Case 1: Gửi message TEXT:**
```json
{
  "to": "user_id_cua_nguoi_nhan",
  "messageContent": {
    "type": "text",
    "text": "Xin chào, đây là tin nhắn test!"
  }
}
```

**Case 2: Gửi message FILE:**
```json
{
  "to": "user_id_cua_nguoi_nhan",
  "messageContent": {
    "type": "file",
    "text": "/path/to/file/document.pdf"
  }
}
```

**Response thành công (201 Created):**
```json
{
  "_id": "message_id",
  "from": {
    "_id": "sender_id",
    "username": "sender_username",
    "fullName": "Sender Name",
    "avatarUrl": "avatar_url"
  },
  "to": {
    "_id": "receiver_id",
    "username": "receiver_username",
    "fullName": "Receiver Name",
    "avatarUrl": "avatar_url"
  },
  "messageContent": {
    "type": "text",
    "text": "Xin chào, đây là tin nhắn test!"
  },
  "isDeleted": false,
  "createdAt": "2026-04-01T08:00:00.000Z",
  "updatedAt": "2026-04-01T08:00:00.000Z"
}
```

---

### ENDPOINT 2: GET /api/v1/messages/:userId - LẤY TẤT CẢ MESSAGE GIỮA 2 USERS

**Mục đích:** Lấy toàn bộ message từ user hiện tại đến userId và ngược lại

**Method:** GET
**URL:** `http://localhost:3000/api/v1/messages/<user_id>`

**Headers:**
```
Authorization: Bearer <token_from_login>
```

**Response thành công (200 OK):**
```json
[
  {
    "_id": "message_id_1",
    "from": {
      "_id": "user_id_1",
      "username": "user1",
      "fullName": "User One",
      "avatarUrl": "avatar_url"
    },
    "to": {
      "_id": "user_id_2",
      "username": "user2",
      "fullName": "User Two",
      "avatarUrl": "avatar_url"
    },
    "messageContent": {
      "type": "text",
      "text": "Hello!"
    },
    "isDeleted": false,
    "createdAt": "2026-04-01T08:00:00.000Z",
    "updatedAt": "2026-04-01T08:00:00.000Z"
  },
  {
    "_id": "message_id_2",
    "from": {
      "_id": "user_id_2",
      "username": "user2",
      "fullName": "User Two",
      "avatarUrl": "avatar_url"
    },
    "to": {
      "_id": "user_id_1",
      "username": "user1",
      "fullName": "User One",
      "avatarUrl": "avatar_url"
    },
    "messageContent": {
      "type": "text",
      "text": "Hi there!"
    },
    "isDeleted": false,
    "createdAt": "2026-04-01T08:01:00.000Z",
    "updatedAt": "2026-04-01T08:01:00.000Z"
  }
]
```

---

### ENDPOINT 3: GET /api/v1/messages/ - LẤY MESSAGE CUỐI CÙNG CỦA TỪNG USER

**Mục đích:** Lấy message cuối cùng của mỗi user mà user hiện tại đã nhắn tin hoặc nhận tin nhắn

**Method:** GET
**URL:** `http://localhost:3000/api/v1/messages/`

**Headers:**
```
Authorization: Bearer <token_from_login>
```

**Response thành công (200 OK):**
```json
[
  {
    "_id": "message_id",
    "from": {
      "_id": "user_id_1",
      "username": "user1",
      "fullName": "User One",
      "avatarUrl": "avatar_url"
    },
    "to": {
      "_id": "current_user_id",
      "username": "currentuser",
      "fullName": "Current User",
      "avatarUrl": "avatar_url"
    },
    "messageContent": {
      "type": "text",
      "text": "Last message from user1"
    },
    "isDeleted": false,
    "createdAt": "2026-04-01T08:05:00.000Z",
    "updatedAt": "2026-04-01T08:05:00.000Z"
  },
  {
    "_id": "message_id_2",
    "from": {
      "_id": "current_user_id",
      "username": "currentuser",
      "fullName": "Current User",
      "avatarUrl": "avatar_url"
    },
    "to": {
      "_id": "user_id_2",
      "username": "user2",
      "fullName": "User Two",
      "avatarUrl": "avatar_url"
    },
    "messageContent": {
      "type": "file",
      "text": "/path/to/file.pdf"
    },
    "isDeleted": false,
    "createdAt": "2026-04-01T08:10:00.000Z",
    "updatedAt": "2026-04-01T08:10:00.000Z"
  }
]
```

---

## THỨ TỰ TEST KHUYẾN NGHỊ

1. **Login** để lấy token (POST /api/v1/auth/login)
2. **Gửi message** từ User A đến User B (POST /api/v1/messages)
3. **Gửi message** từ User B đến User A (POST /api/v1/messages)
4. **Lấy tất cả message** giữa User A và User B (GET /api/v1/messages/:userId)
5. **Lấy message cuối cùng** của mỗi user (GET /api/v1/messages/)

---

## LƯU Ý KHI CHỤP ẢNH POSTMAN

1. Chụp rõ: URL, Method, Headers, Body
2. Chụp cả Response status và Response body
3. Đặt tên rõ ràng cho từng ảnh:
   - POST_send_message_text.png
   - POST_send_message_file.png
   - GET_messages_between_users.png
   - GET_last_messages.png

---

## CÁC FILE ĐÃ TẠO

✅ schemas/messages.js - Schema message
✅ controllers/messages.js - Controller message
✅ routes/messages.js - Routes message
✅ app.js - Đã đăng ký routes messages
