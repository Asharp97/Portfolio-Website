import assert from "node:assert/strict";
import test from "node:test";
import { createContactSchema } from "../shared/utils/contact.ts";

const valid = { email: " person@example.com ", name: " Person ", msg: " A useful contact message. " };
const schema = createContactSchema();

test("normalizes contact fields before validating and sending", () => {
  assert.deepEqual(schema.parse(valid), { email: "person@example.com", name: "Person", msg: "A useful contact message." });
});

test("rejects malformed, blank, oversized, and header-injected contact data", () => {
  for (const input of [null, {}, { ...valid, email: "invalid" }, { ...valid, name: "  " },
    { ...valid, msg: "          " }, { ...valid, msg: "x".repeat(10001) },
    { ...valid, name: "Person\r\nBcc: attacker@example.com" }]) {
    assert.equal(schema.safeParse(input).success, false);
  }
});

test("produces localized validation messages", () => {
  const localized = createContactSchema(key => `translated:${key}`);
  const result = localized.safeParse({ ...valid, email: "invalid" });
  assert.equal(result.error.issues[0].message, "translated:validation.email");
});
