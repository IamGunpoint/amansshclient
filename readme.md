# SSH 🌐 | BY AMAN

A **tmate / sshx–style web terminal** that lets you access your VPS terminal directly from a browser using a secure WebSocket tunnel.

This project has **two parts**:
- 🖥 **Server** (hosted on Render / VPS)
- 🧑‍💻 **Client** (runs on your VPS and exposes a live shell)

Once the client is running, you get a **browser link** where you can type commands and control your VPS in real time.

---

## ✨ Features

- 🔥 Real interactive **PTY shell (bash)**
- ⌨️ Full keyboard input (typing works)
- 🌍 Access terminal from **any browser**
- 🎨 Clean dark UI
- 🔗 One-time session URL (like tmate)

---

## 🧠 How It Works (Simple)

- The **client** opens a real bash shell using `node-pty`
- The **server** acts as a relay
- The **browser** shows the terminal using `xterm.js`

⚠️ **Important:**  
The browser terminal only works when the **client is running on the VPS**.

---

## 📦 Requirements (Client Side)

- Ubuntu / Debian VPS
- Node.js 18+ (Node 20 recommended)
- Internet access

---

## 🚀 Client Installation (VPS)

Run these commands on your VPS:

```bash
git clone https://github.com/IamGunpoint/ssh
cd ssh

apt update && apt install -y nodejs npm

npm init -y
npm install ws node-pty

node ssh.js
