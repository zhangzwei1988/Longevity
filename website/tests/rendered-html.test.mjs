import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the finished brand homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /专替忙人做/);
  assert.match(html, /健康功课/);
  assert.match(html, /多活十年 Lab/);
  assert.match(html, /首要关注入口/);
  assert.match(html, /二维码占位/);
  assert.match(html, /健年 Healthspan/);
  assert.doesNotMatch(html, /未来十年健康盘点|创始体验价|¥999|首批体验/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("renders the public boundary and privacy pages", async () => {
  const [sample, boundaries, privacy] = await Promise.all([render("/sample"), render("/boundaries"), render("/privacy")]);
  assert.equal(sample.status, 307);
  assert.equal(sample.headers.get("location"), "http://localhost/");
  assert.equal(boundaries.status, 200);
  assert.equal(privacy.status, 200);
  assert.match(await boundaries.text(), /内容与专业边界/);
  assert.match(await privacy.text(), /不要求访客提交健康资料/);
});
