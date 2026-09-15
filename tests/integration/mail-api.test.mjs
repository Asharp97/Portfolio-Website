import assert from "node:assert/strict";
import { createServer } from "node:net";
import { once } from "node:events";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";

test("production pages and contact API against local SMTP", { timeout: 30000 }, async (t) => {
  const messages = [];
  let rejectMail = false;
  const smtp = createServer(socket => {
    socket.setEncoding("utf8");
    socket.write("220 localhost test SMTP\r\n");
    let buffer = "";
    let data = false;
    let message = "";
    socket.on("error", () => {});
    socket.on("data", chunk => {
      buffer += chunk;
      while (buffer.includes("\r\n")) {
        const end = buffer.indexOf("\r\n");
        const line = buffer.slice(0, end);
        buffer = buffer.slice(end + 2);
        if (data) {
          if (line === ".") {
            messages.push(message);
            data = false;
            socket.write("250 accepted\r\n");
          } else message += line + "\r\n";
        } else if (/^EHLO|^HELO/.test(line)) socket.write("250 localhost\r\n");
        else if (/^MAIL/.test(line) && rejectMail) socket.write("550 rejected by test\r\n");
        else if (line === "DATA") {
          data = true;
          message = "";
          socket.write("354 end with dot\r\n");
        } else if (line === "QUIT") socket.end("221 bye\r\n");
        else socket.write("250 OK\r\n");
      }
    });
  });
  smtp.listen(0, "127.0.0.1");
  await once(smtp, "listening");
  t.after(() => smtp.close());

  const reserve = createServer();
  reserve.listen(0, "127.0.0.1");
  await once(reserve, "listening");
  const port = reserve.address().port;
  await new Promise(resolve => reserve.close(resolve));
  const app = spawn(process.execPath, [".output/server/index.mjs"], {
    cwd: new URL("../../", import.meta.url),
    env: { ...process.env, NITRO_HOST: "127.0.0.1", NITRO_PORT: String(port),
      SMTP_SERVER: "127.0.0.1", SMTP_PORT: String(smtp.address().port),
      LOGIN: "", PASSWORD: "", SENDER: "sender@example.test", MY_EMAIL: "recipient@example.test" },
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  let logs = "";
  app.stdout.on("data", chunk => { logs += chunk; });
  app.stderr.on("data", chunk => { logs += chunk; });
  t.after(() => app.kill());
  const base = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch { /* Wait for startup. */ }
    if (app.exitCode !== null) break;
    await delay(100);
  }
  assert.ok(ready, logs);

  await t.test("renders both locales, assets, sitemap, and 404", async () => {
    for (const path of ["/", "/tr"]) {
      const response = await fetch(base + path);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.match(html, /Ali Elsayed/);
      assert.match(html, /id="experiences"/);
      assert.match(html, /name="email"/);
      const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
      assert.equal(new URL(canonical).pathname, path);
    }
    for (const locale of ["en", "tr"]) {
      assert.equal((await fetch(`${base}/Ali-Elsayed-Resume-${locale}.pdf`)).status, 200);
    }
    const sitemap = await (await fetch(base + "/sitemap.xml")).text();
    assert.match(sitemap, /<loc>https:\/\/ali-elsayed.vercel.app\/tr<\/loc>/);
    assert.doesNotMatch(sitemap, /\?locale=/);
    assert.equal((await fetch(base + "/missing-audit-page")).status, 404);
  });

  const submit = body => fetch(base + "/api/sendMail", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  await t.test("rejects invalid input without reaching SMTP", async () => {
    assert.equal((await submit({ email: "bad", name: " ", msg: "short" })).status, 400);
    assert.equal(messages.length, 0);
    assert.ok((await fetch(base + "/api/sendMail")).status >= 400);
  });
  await t.test("sends normalized text and a reply address with a minimal response", async () => {
    const response = await submit({ email: " visitor@example.test ", name: " Visitor ", msg: " A local test message. " });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    assert.equal(messages.length, 1);
    assert.match(messages[0], /Reply-To: visitor@example.test/);
    assert.match(messages[0], /Subject: Portfolio message from Visitor/);
    assert.match(messages[0], /MESSAGE: A local test message\./);
  });
  await t.test("returns a generic error when SMTP rejects the message", async () => {
    rejectMail = true;
    const response = await submit({ email: "visitor@example.test", name: "Visitor", msg: "Another local test message." });
    assert.equal(response.status, 502);
    assert.doesNotMatch(await response.text(), /recipient@example|rejected by test/);
    assert.equal(messages.length, 1);
  });
});
