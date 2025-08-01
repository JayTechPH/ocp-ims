# Centralized Information System for the Office of the Prosecutor’s Case and Hearing Management

---

## 📌 Description

This system is designed to improve the efficiency and accuracy of legal case management through a centralized platform. It includes attendance logging and history, hearing scheduling, and organized storage of filed cases. The goal is to reduce human error, avoid missed schedules, and keep everyone updated with real-time case progress. With this system, administrators and clients can access and manage records easily, leading to better workflow and coordination.

---

## 🎯 Objectives

* **Specific:** Develop an integrated information system with:

  * Attendance logging and history
  * Hearing scheduling
  * Filed case management
  * Real-time case status tracking

* **Measurable:** Effectiveness will be measured by:

  * Accurate attendance records
  * Efficient schedule handling
  * Real-time status updates
  * System reliability
  * User satisfaction
  * Data accuracy

* **Achievable:**
  Built using:

  * HTML, CSS, Bootstrap
  * Node.js (Backend)
  * MySQL (Database)

  The development is achievable within the scope and resources of the team.

* **Relevant:**
  Supports digital transformation in the legal sector by automating manual processes, reducing delays, and making legal workflows more organized.

* **Time-Bound:**
  The system will be fully developed and tested within two months, including all major features.

---

## ✅ Scope

* Admin-controlled account creation
* Case status and progress tracking
* Scheduling and viewing upcoming hearings
* Attendance logging and history tracking
* Organized filing of case details
* Real-time case updates via SMS and client dashboard

---

## ⚠️ Limitations

* No sign-up feature; accounts are issued by admin
* Only two roles: Admin and Client
* Requires internet connection; no offline mode

---

## 👨‍💻 Proposed by

* Arsenio, Reema G.
* Cruz, Khryz Heaven Q.
* Garcia, Hanz Christian A.
* Manzanillo, Ella Ann
* Nuqui, Marc Angelo B.
* Pangilinan, Ar Jay S.

---

## ✅ Approved by

**Prof. Catherine P. Llena, MIT, MPA**
Professor, Database System and Enterprise

---

## 📥 Installation Guide

### 🛠 Requirements

* Node.js (v16 or higher)
* npm (Node Package Manager)

### 🔧 Steps to Install

1. **Clone the project**

   ```bash
   git clone https://github.com/yourusername/ocp-ims.git
   cd ocp-ims
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the environment**

   * Create a `.env` file in the root folder with the following:

     ```
     PORT=8080
     JWT_SECRET=your_secret_key
     DB_PATH=./data.db
     ```

4. **Run the server**

   * For development (with auto-reload):

     ```bash
     npm run dev
     ```
   * For production:

     ```bash
     npm start
     ```

5. **Default Admin Credentials**

   ```
   Username: admin
   Password: admin123
   ```