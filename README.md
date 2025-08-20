# 🛍️ Ecommerce-Web-ShopAppPEUS – Admin Dashboard (ReactJS)

## 🚀 Introduction  
**Ecommerce-Web-ShopAppPEUS** is a **ReactJS-based Admin Dashboard** for managing an e-commerce system.  
It provides a modern, responsive, and user-friendly interface for administrators to manage products, users, orders, and sales statistics.  

This project integrates seamlessly with the [Ecommerce-Backend-API](https://github.com/your-username/Ecommerce-Backend-API), forming a complete e-commerce management system.

---

## 🌐 Live Demo  
👉 [Ecommerce-Web-ShopAppPEUS on GitHub Pages](https://thanhbinh0707.github.io/Ecommerce-Web-ShopAppPEUS/)

---

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-v18-blue.svg" alt="ReactJS"></a>
  <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/Redux-Toolkit-purple.svg" alt="Redux Toolkit"></a>
  <a href="https://mui.com/"><img src="https://img.shields.io/badge/MUI-v5-lightblue.svg" alt="Material UI"></a>
  <a href="https://axios-http.com/"><img src="https://img.shields.io/badge/Axios-HTTP%20Client-orange.svg" alt="Axios"></a>
  <a href="https://reactrouter.com/"><img src="https://img.shields.io/badge/React%20Router-v6-green.svg" alt="React Router"></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-Container-blue.svg" alt="Docker"></a>
</p>

<h4 align="center">
  A powerful admin dashboard built with ReactJS for managing products, orders, users, and statistics.<br>
  Optimized for scalability, real-time updates, and seamless backend integration.
</h4>

<p align="center">
 <a href="#features">Features</a> •
 <a href="#upcoming-features">Upcoming Features</a> •
 <a href="#prerequisites">Prerequisites</a> •
 <a href="#getting-started">Getting Started</a> •
 <a href="#available-scripts">Available Scripts</a> •
 <a href="#project-structure">Project Structure</a> •
 <a href="#screenshots">Screenshots</a> •
 <a href="#built-with">Built With</a> 
</p>

---

## 🚀 Features

- **Authentication & Role Management** 🔐  
  - JWT-based login  
  - Admin / Manager roles  

- **Dashboard Overview** 📊  
  - Sales, revenue, and order statistics  

- **Product Management** 🛒  
  - Add, edit, delete, and view products  

- **Order Management** 📦  
  - Track, update, and filter orders  

- **User Management** 👥  
  - Manage customer and staff accounts  

- **Responsive Design** 📱  
  - Optimized for desktop and tablet  

---

## 🔮 Upcoming Features  

🛡️ **Advanced Role System**  
- Super Admin / Manager / Staff  

📦 **Inventory Management**  
- Track product quantities  
- Low-stock alerts  

📋 **Customer Management Enhancements**  
- Customer insights & segmentation  

---

## 🌀 Prerequisites

Make sure you have installed:

- [Node.js v18+](https://nodejs.org/)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  

---

## ⚙️ Getting Started

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/Ecommerce-Web-ShopAppPEUS.git
   cd Ecommerce-Web-ShopAppPEUS
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**  
   Create `.env` file in project root:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api/v1
   ```

4. **Run Development Server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

---

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`  
Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  
The page will reload when you make changes. You may also see any lint errors in the console.  

### `npm test`  
Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests).  

### `npm run build`  
Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.  

The build is minified and the filenames include hashes. Your app is ready to be deployed!  
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment).  

### `npm run eject`  
⚠️ **Note: this is a one-way operation. Once you eject, you can't go back!**  

If you aren’t satisfied with the default configuration, you can `eject` to gain full control over webpack, Babel, ESLint, etc.  

---

## 📂 Project Structure

```
Ecommerce-Web-ShopAppPEUS/
│── node_modules/
│── public/
│── src/
│   ├── components/
│   ├── helper/
│   ├── media/
│   ├── pages/
│   ├── users/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.js
│   └── setupTests.js
│
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── text.txt
└── tsconfig.json
```

---

## 🛠 Built With

- [ReactJS](https://react.dev/) – Frontend library  
- [Redux Toolkit](https://redux-toolkit.js.org/) – State management  
- [Material UI](https://mui.com/) – UI components  
- [Axios](https://axios-http.com/) – API client  
- [React Router v6](https://reactrouter.com/) – Routing  
- [Docker](https://www.docker.com/) – Containerization (optional)  

---

## 📖 Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).  

To learn React, check out the [React documentation](https://reactjs.org/).  

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)  
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)  
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)  
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)  
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)  
- [Troubleshooting Build Errors](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)  

---

## 📄 License

This project is licensed under the MIT License — feel free to use, modify, and distribute.  

---

✨ *Developed with ❤️ by Thanh Binh*
