# 🔐 Full Stack Authentication System

A secure and production-ready authentication backend built using **Node.js, Express, MongoDB, and JWT**, featuring **Email OTP verification** and **Password Reset via Email Link**.

This system follows real-world authentication practices used in modern SaaS applications.

---

# 🚀 Features

## 🧾 User Registration

* User can create account using:

  * Name
  * Email
  * Password
* Password is securely hashed using **bcrypt**
* OTP verification code is sent to user's email

---

## ✉️ Email Verification (OTP)

* 5-digit OTP sent via **Nodemailer**
* OTP has expiry time
* Account activated only after successful verification
* Welcome email sent after verification

---

## 🔑 Secure Login

* Login using email and password
* Password verified using bcrypt
* JWT token generated and stored in **HTTP-Only Cookie**
* Protected routes accessible only to authenticated users

---

## 🔁 Forgot Password

* User can request password reset
* Secure reset link sent to registered email
* Link contains unique token with expiry

---

## 🔒 Reset Password

* User can reset password using email link
* Token verified before allowing reset
* Password securely re-hashed
* Confirmation email sent after successful reset

---

## 🛡️ Protected Routes

* Middleware verifies JWT token
* Unauthorized users cannot access protected APIs

---

# 🧠 Security Features

* Password hashing using bcrypt
* JWT authentication
* HTTP-Only cookies
* Token expiry
* Email verification
* Secure password reset tokens

---

# 🛠️ Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

**Authentication**

* JWT
* bcrypt

**Email Service**

* Nodemailer
* Gmail SMTP

---

# 📁 Project Structure

```
Backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
└── server.js
```

---

# ⚙️ Environment Variables

Create `.env`

```
PORT=4000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Run Locally

```
npm install
npm run dev
```

---

# 📬 API Features

* Signup
* Email Verification
* Login
* Logout
* Forgot Password
* Reset Password
* Check Auth

---

# 🌟 Highlights

This project demonstrates real-world authentication flow used in:

* SaaS applications
* Startup products
* Production backend systems

---

# 👨‍💻 Author

Sourodip Dey

Full Stack MERN Developer
