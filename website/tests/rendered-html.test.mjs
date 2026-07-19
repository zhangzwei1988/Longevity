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
  assert.match(html, /科学养生/);
  assert.match(html, /少走弯路/);
  assert.match(html, /未来十年健康盘点/);
  assert.match(html, /让有活力的人生/);
  assert.match(html, /找到关键短板/);
  assert.match(html, /虚构样板/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("renders the trust and boundary pages", async () => {
  const [sample, boundaries, privacy] = await Promise.all([render("/sample"), render("/boundaries"), render("/privacy")]);
  assert.equal(sample.status, 200);
  assert.equal(boundaries.status, 200);
  assert.equal(privacy.status, 200);
  assert.match(await sample.text(), /31,600/);
  assert.match(await boundaries.text(), /不卖诊断/);
  assert.match(await privacy.text(), /少收集/);
});
