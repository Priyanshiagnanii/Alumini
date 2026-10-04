# 🎓 ALUMNI CONNECT – Alumni Network & Mentorship Matching Platform
> **Tagline:** Match • Mentor • Grow

---

## 📌 Project Overview
**Alumni Connect** is a web-based mentorship matching platform. It connects college students with experienced alumni for 1-on-1 technical mentorship, project guidance, career counseling, and mock interviews.

This repository provides a complete, modern **Frontend Demonstration** designed for college project submission and viva presentation.

---

## 🚀 How to Run the Project
No Node.js, server installation, database engine setup, or backend compilation is required!

1. **Option 1: Direct File Opening**  
   Double-click `index.html` or drag `index.html` directly into any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari, Brave).

2. **Option 2: Live Server Extension (Optional)**  
   If using VS Code, right-click `index.html` and select **"Open with Live Server"**.

---

## 🗂 Database Entities & Schema Design
The system is built on **6 Core Relational Entities**:

1. **STUDENTS** (`student_id`, `name`, `email`, `grad_year`)
2. **ALUMNI** (`alumni_id`, `name`, `email`, `job_title`, `field_id`, `is_active`, `rating`, `num_reviews`, `bio`)
3. **FIELDS** (`field_id`, `field_name`, `category`)
4. **MENTORSHIP_REQUESTS** (`request_id`, `student_id`, `field_id`, `mentor_id`, `message`, `status`)
5. **SESSIONS** (`session_id`, `request_id`, `alumni_id`, `session_date`, `start_time`, `end_time`, `status`)
6. **FEEDBACK** (`feedback_id`, `session_id`, `rating`, `review_text`, `created_at`)

---

## 📄 Pages Included & Navigation

| File | Page Name | Purpose & Key Features |
|---|---|---|
| `index.html` | **Landing / Home** | Hero banner, live stats counters, 4-step workflow, featured alumni mentors, login modal. |
| `login.html` | **Login Portal** | Standalone login page with Student and Alumni account selection tabs. |
| `signup.html` | **Account Registration** | New user sign-up page for registering brand new Students or Alumni Mentors. |
| `student-dashboard.html` | **Student Dashboard** | Dashboard metrics, domain filter, mentor match search (ordered by highest rating), request modal. |
| `requests.html` | **My Requests** | List of submitted requests, color-coded status badges (`Pending`, `Accepted`, `Completed`, `Declined`), slot scheduling modal. |
| `sessions.html` | **My Sessions** | Upcoming 1-on-1 virtual sessions, meeting link generator, mark session complete button. |
| `feedback.html` | **Session Feedback** | Completed sessions listing, interactive 1–5 star rating picker, review text area, toast confirmation. |
| `alumni-dashboard.html` | **Alumni Dashboard** | Alumni greeting, ACTIVE/INACTIVE availability toggle, incoming student requests with Accept/Decline buttons. |
| `alumni-sessions.html` | **Alumni Sessions** | Scheduled mentorship sessions table for alumni view. |
| `profile.html` | **User Profile** | Profile card for logged-in Student or Alumni, field specialization, and graduation year details. |

---

## ⚡ Mock & Frontend Interactions Implemented

1. **Role Switcher & Authentication Demo:**  
   Clicking **Login** or switching roles instantly loads mock profiles (e.g. Student *Priyanshi Sharma* or Alumni *Aarav Mehta*).
2. **Mentor Matching & Sorting:**  
   Selecting a field (e.g. **Database & Systems**) filters active alumni and orders them by **highest star rating first** (*Aarav Mehta (4.8)*, *Arjun Kapoor (4.7)*, *Priya Singh (4.6)*).
3. **Request Submission:**  
   Students can request mentorship. The request is immediately added to `localStorage` with a `Pending` badge.
4. **Alumni Acceptance & Auto-Scheduling:**  
   When Alumni Aarav accepts a request, status turns to `Accepted`, and a session is automatically added to the schedule.
5. **Scheduling Conflict Detection Demo:**  
   Attempting to book an occupied time slot (e.g. Aarav on `2026-10-10` at `04:00 PM`) triggers an alert:  
   *"This mentor is unavailable at this time. Please choose another slot."*
6. **Availability Switch:**  
   Alumni can toggle between `ACTIVE` and `INACTIVE` status, dynamically affecting student mentor search results.
7. **Star Rating & Feedback:**  
   Students can rate completed sessions from 1 to 5 stars and submit reviews.
8. **Toast Notifications:**  
   Visual feedback toasts for all create/update/delete operations.

---

## 🔌 Future Backend Integration Guide (PHP & MySQL)

To connect this frontend platform to a full-stack backend using **PHP** and **MySQL**:

### 1. MySQL Database Creation SQL Script
```sql
CREATE DATABASE alumni_connect_db;
USE alumni_connect_db;

CREATE TABLE FIELDS (
    field_id INT AUTO_INCREMENT PRIMARY KEY,
    field_name VARCHAR(100) NOT NULL,
    category VARCHAR(100)
);

CREATE TABLE STUDENTS (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    grad_year INT NOT NULL
);

CREATE TABLE ALUMNI (
    alumni_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    job_title VARCHAR(150),
    field_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    rating DECIMAL(2,1) DEFAULT 5.0,
    num_reviews INT DEFAULT 0,
    FOREIGN KEY (field_id) REFERENCES FIELDS(field_id) ON DELETE SET NULL
);

CREATE TABLE MENTORSHIP_REQUESTS (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    field_id INT NOT NULL,
    mentor_id INT NOT NULL,
    message TEXT,
    status ENUM('Pending', 'Accepted', 'Completed', 'Declined') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES STUDENTS(student_id),
    FOREIGN KEY (field_id) REFERENCES FIELDS(field_id),
    FOREIGN KEY (mentor_id) REFERENCES ALUMNI(alumni_id)
);

CREATE TABLE SESSIONS (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    alumni_id INT NOT NULL,
    session_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    FOREIGN KEY (request_id) REFERENCES MENTORSHIP_REQUESTS(request_id),
    FOREIGN KEY (alumni_id) REFERENCES ALUMNI(alumni_id)
);

CREATE TABLE FEEDBACK (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    rating INT CHECK(rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES SESSIONS(session_id)
);
```

### 2. Replacing Mock JS with PHP API Calls
Replace functions in `js/app.js` with `fetch()` calls targeting PHP endpoints:
- Replace `getDB()` with `fetch('api/get_mentors.php?field=' + fieldSelect)`
- Replace `submitMentorshipRequest()` with `fetch('api/submit_request.php', { method: 'POST', body: JSON.stringify(...) })`

---

## 🎨 Technology Stack
- **HTML5 & CSS3** (Vanilla CSS with Custom CSS Variables & SaaS Layout)
- **JavaScript (ES6+)** (DOM Manipulation & LocalStorage Persistence)
- **FontAwesome 6** (Modern Scalable Vector Icons)
- **Google Fonts** (*Plus Jakarta Sans*)

---

*Alumni Connect Platform Documentation*