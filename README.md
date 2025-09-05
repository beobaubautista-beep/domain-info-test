# 🌐 Domain Info Lookup App

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

