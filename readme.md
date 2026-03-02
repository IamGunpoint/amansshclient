## 🚀 Client Installation (VPS)

Run these commands on your VPS:

```bash
git clone https://github.com/IamGunpoint/ssh
cd ssh

apt update && apt install -y nodejs npm

npm init -y
npm install ws node-pty

node ssh.js
