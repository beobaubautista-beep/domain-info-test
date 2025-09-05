
# 🌐 Domain Info Lookup App

# SETUP FRONT END

A full-stack web application built with **React**, **Node.js**, **Express**, and **Tailwind CSS** that allows users to:

- Enter a domain name (e.g. `example.com`)
- Fetch WHOIS information (registrant, admin, and technical contacts)
- View domain creation, expiry, and registrar info
- See estimated domain age
- Display contact information cleanly
- Responsive and styled using Tailwind CSS

---

## 📁 Project Structure

domain-info-app/
├── client/ # React frontend
│ ├── src/
│ │ ├── App.jsx
│ │ ├── Home.jsx
│ │ ├── Info.jsx
│ │ ├── utils.js # (e.g. truncate, formatDate, domainAge)
│ │ └── ...
│ └── tailwind.config.js
├── server/ # Express backend
│ ├── index.js
│ └── routes/
│ └── whois.js
├── README.md
└── package.json


---

## 🚀 Features

- ✅ WHOIS domain lookup via API (e.g. WhoisXML API)
- ✅ Clean domain & contact info display
- ✅ Date formatting (`29 July, 1995`)
- ✅ Domain age calculation (`30 years, 1 month`)
- ✅ Input validation & error handling
- ✅ Query string support (e.g. `/info?domain=example.com`)
- ✅ Description truncation with ellipsis (`...`)

---

## ⚙️ Technologies Used

- React (with Hooks + React Router)
- Node.js + Express
- Tailwind CSS
- Axios or Fetch API
- WhoisXML API (or any other WHOIS provider)

---

## 🧑‍💻 Setup Instructions

### 1. Clone the repository

bash
git clone https://github.com/yourusername/domain-info-app.git
cd domain-info-app


# SETUP BACKEND

cd server
npm install

# 🔑 Configure WHOIS API Key

const API_KEY = 'YOUR_WHOISXMLAPI_KEY';

# Run backend:

node index.js

# 📜 License

MIT — free for personal or commercial use.

# 🤝 Acknowledgements

WhoisXML API
Tailwind CSS
React