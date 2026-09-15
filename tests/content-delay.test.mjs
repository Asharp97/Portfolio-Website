import assert from "node:assert/strict";
import test from "node:test";
import getDelayByContent from "../app/utils/getDelayByContent.ts";

test("always gives empty and short slides at least three seconds", () => {
  for (const input of [undefined, {}, { description: "Hi" }, { points: [] }]) {
    assert.equal(getDelayByContent(input), 3000);
  }
});

test("calculates reading time for descriptions and numeric points", () => {
  assert.equal(getDelayByContent({ description: "x".repeat(150) }), 10000);
  assert.equal(getDelayByContent({ points: [{ label: "x".repeat(147), value: 100 }] }), 10000);
});
