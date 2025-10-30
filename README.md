# 📱 HealthHub Mobile App

**HealthHub** is a comprehensive mobile application designed to promote a **healthy lifestyle** and simplify **medical appointment booking**.  
It seamlessly integrates with a powerful **Laravel 10 backend** that handles authentication, scheduling, and e-commerce operations.

---

## 🎬 Demo Video

📹 Watch a quick demo of the app here:  
👉 [Click to view on Google Drive](https://drive.google.com/file/d/1J370iFDNj_uZkKTAEhQg5GszSC9qi3pb/view?usp=drive_link)

---

## 🧩 Backend Integration

The HealthHub Mobile App is connected to a **Laravel 10 backend** that provides secure and efficient API endpoints for:
- User Authentication (JWT-based)
- Role-based Access (Admin, Doctor, Patient)
- Appointment Scheduling and Management
- E-commerce for medical products
- Admin Reports and Statistics

📘 Backend Repository: [HealthHub Laravel Backend](https://github.com/mohamedabdallah11/HealthHub)

### 🔹 Example API Call (React Native → Laravel)
```js
import axios from "axios";

const response = await axios.get("http://10.0.2.2:8000/api/doctor/appointments/show", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

📍 *This demonstrates how the mobile app fetches doctor appointments from the Laravel backend.*

---

## 🚀 Getting Started (Mobile App)

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Start Metro server
```bash
npm start
```

### 3️⃣ Run the app on Android
```bash
npm run android
```

### 4️⃣ Or on iOS
```bash
npm run ios
```

---

## ⚙️ Key Features

### 🔐 Authentication & Profiles
- Secure login and registration (JWT token)
- Role-based access (Admin, Doctor, Patient)

### 📅 Appointment & Booking System
- Doctors can set and edit availability
- Patients can view and book available slots
- Doctors confirm, reject, or mark appointments as served
- Patients can cancel bookings under specific rules

### 🛒 E-Commerce Module
- Admins manage medical products and orders
- Patients can browse, add to cart, and checkout securely
- Integrated payment system (Stripe, PayPal-ready)

### 🍎 Nutrition & Health Section
- AI-based food recognition via **Clarifai API**
- Nutrition and calorie details via **Spoonacular API**
- Healthy articles, recipes, and fitness advice

---

## 🧠 Tech Stack

| Category | Technology |
|-----------|-------------|
| Mobile App | React Native 0.72+ |
| Backend API | Laravel 10 (PHP 8.2) |
| Database | MySQL 8 |
| APIs | Clarifai, Spoonacular |
| State Management | Context API / AsyncStorage |
| Networking | Axios |
| Authentication | JWT Token |
| Version Control | Git & GitHub |

---

## 🧩 System Architecture Overview

```
+---------------------------+
|      React Native App     |
|  (HealthHub Frontend)     |
+------------+--------------+
             |
     RESTful API Calls
             |
+------------v--------------+
|     Laravel 10 Backend    |
| Authentication | Booking  |
| E-Commerce | Reporting    |
+------------+--------------+
             |
        MySQL Database
```

---

## 👩‍💻 Developer

**Esraa Shiref**  
📧 [LinkedIn](https://www.linkedin.com/in/esraa-shiref/)  
📂 [GitHub](https://github.com/EsraaShiref)

---

## 🏁 Notes

> This project is part of a full-stack solution that includes a Laravel backend and a React Native frontend.  
> Both components work together to deliver a seamless medical booking and healthy living experience. 💪
