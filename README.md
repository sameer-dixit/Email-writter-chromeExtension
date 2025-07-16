# 📧 Smart Email Assistant – Chrome Extension

An AI-powered Chrome Extension that boosts your email productivity!  
Built with **Spring Boot** and **React**, this tool integrates directly with Gmail to generate intelligent email replies using **Google Gemini API**.

---

## 🚀 Features

- ✨ Auto-generate professional replies to your emails.
- 🔗 Seamlessly integrates into Gmail.
- 🔒 Securely handles your email data.
- ⚡ Instant responses powered by Google’s Gemini LLM.
- 🛠 Built with scalable Spring Boot backend and modern React frontend.

---

## 🧑‍💻 Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Spring Boot, Java
- **AI API:** Google Gemini Pro API
- **Browser:** Chrome Extension APIs
- **Tools:** Git, Postman, IntelliJ, VS Code

---

## 🖼️ Demo

> 🌐 **Live Extension:** _Coming soon or hosted manually_

![Extension UI Screenshot](https://your-image-link.com/screenshot.png)

---

## 📂 Folder Structure

```
smart-email-assistant/
├── backend/             # Spring Boot API for Gemini integration
│   └── src/
├── extension/           # Chrome Extension frontend (React)
│   ├── public/
│   └── src/
└── README.md
```

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/sameer-dixit/Email-writter-chromeExtension.git
cd Email-writter-chromeExtension
```

### 2. Backend Setup (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
```
Make sure you’ve added your **Gemini API Key** in `application.properties`:
```properties
gemini.api.key=YOUR_GEMINI_API_KEY
```

### 3. Frontend Setup (Chrome Extension - React)
```bash
cd extension
npm install
npm run build
```

### 4. Load the Extension in Chrome
- Go to `chrome://extensions/`
- Enable **Developer Mode**
- Click **Load unpacked**
- Select the `/extension/build` folder

---

## ⚙️ Usage

1. Open Gmail in Chrome.
2. Select an email thread.
3. Click the extension icon.
4. Hit **“Generate Reply”**.
5. Review and send your AI-crafted response!

---

## 🔐 Security Note

- Your data is processed locally before sending minimal context to Gemini API.
- The backend is designed to prevent unauthorized access.

---

## ✨ Future Enhancements

- Support for other email platforms (Outlook, Yahoo)
- Custom tone and style selection
- Auto-scheduling replies
- Voice-to-text input

---

## 🙌 Credits

Developed by **Sameer Dixit**  
🔗 [LinkedIn](https://linkedin.com/in/sameer-dixit)  
📧 sameerdixit.work@gmail.com

---

