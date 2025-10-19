# 🧩 MERN Stack Machine Test – Task Distribution System

## 📘 Overview

This project is a **MERN Stack application** built as part of the Machine Test for the **MERN Developer Intern** role.  
It allows an Admin to:

- Log in securely using **JWT Authentication**
- Create and manage **Agents**
- Upload a **CSV/Excel file** of customer lists
- Automatically distribute the uploaded data **equally among 5 agents**

---

## 🚀 Features

- ✅ Admin login using JWT authentication  
- ✅ Add, edit, and view agents  
- ✅ Upload and validate `.csv`, `.xlsx`, and `.xls` files  
- ✅ Automatically distribute uploaded data among 5 agents  
- ✅ View distributed lists on the dashboard  
- ✅ Responsive UI built with **React** and **Bootstrap**  

---

## 🏗️ Tech Stack

| Layer           | Technology                          |
|-----------------|------------------------------------|
| Frontend        | React.js, Axios, Bootstrap          |
| Backend         | Node.js, Express.js                 |
| Database        | MongoDB (Mongoose ORM)              |
| Authentication  | JSON Web Token (JWT)                |
| File Handling   | Multer, CSV-Parser, XLSX            |
| Environment     | dotenv                              |

---

## 📂 Project Structure

CS TECH/
│
├── backend/
│ ├── config/db.js
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── package.json
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ └── App.js
│ └── package.json
│
├── README.md


---

## ⚙️ Environment Setup

### 1. Clone the Repository

git clone https://github.com/imakash-24/Agent-task-manager.git
cd Agent-task-manager

### 2. Setup the Backend

cd backend
npm install

### 3. Add .env file
PORT=4000
db=your_mongodb_connection_string
jwt_secret=your_jwt_secret_key

npm start

### 4. Setup the Frontend

cd ../frontend
npm install
npm run dev

## 🔐 Default Admin Credentials

Email: admin@example.com
Password: admin123

## 📤 CSV Upload Format

Your CSV or Excel file should contain:

| FirstName | Phone       | Notes           |
|-----------|------------|----------------|
| John      | 9876543210 | Example note   |
| Sarah     | 9123456789 | Another note   |

## 🧮 Distribution Logic
- Total items are divided equally among 5 agents.
- If not divisible by 5, remaining items are assigned one by one to agents sequentially.
  (e.g., 27 items → 5, 5, 5, 6, 6)


## 🎥 Video Demonstration
[Google Drive Demo Video](https://drive.google.com/your-demo-link)

## 🧰 Dependencies Used

### Backend

- express
- mongoose
- jsonwebtoken
- bcryptjs
- multer
- csv-parser / xlsx
- dotenv

### Frontend

- react-router-dom
- axios
- tailwindcss

## 🧑‍💻 Author

- **Name:** JAIAKASH S 
- **Role:** MERN Stack Developer Intern Applicant  
- **Email:** jaiakash2409@gmail.com
- **GitHub:** https://github.com/imakash-24


