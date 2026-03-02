#!/usr/bin/env node

import WebSocket from "ws"
import pty from "node-pty"
import os from "os"

const SERVER =
  "wss://amanssh.onrender.com/agent" // CHANGE THIS

const shell =
  process.env.SHELL ||
  (os.platform() === "win32" ? "powershell.exe" : "bash")

console.log("🔐 amanSSH starting...")
console.log("📡 Connecting to server...\n")

const ws = new WebSocket(SERVER)

const term = pty.spawn(shell, [], {
  name: "xterm-256color",
  cols: 80,
  rows: 24,
  cwd: process.cwd(),
  env: process.env
})

ws.on("open", () => {
  console.log("✅ Connected to amanSSH server")
})

ws.on("message", (msg) => {
  // First message = session info
  try {
    const data = JSON.parse(msg.toString())
    if (data.id && data.url) {
      console.log("\n🚀 Session created")
      console.log(
        "🌍 Open this link:\n" +
        `https://YOURDOMAIN.onrender.com${data.url}\n`
      )
      return
    }
  } catch {}

  term.write(msg)
})

ws.on("close", () => {
  console.log("\n❌ Connection closed")
  process.exit(0)
})

ws.on("error", (err) => {
  console.error("WebSocket error:", err.message)
  process.exit(1)
})

// Terminal → Server
term.on("data", (data) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(data)
  }
})

// Cleanup
process.on("SIGINT", () => {
  ws.close()
  term.kill()
  process.exit(0)
})
