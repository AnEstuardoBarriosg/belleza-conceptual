const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../server");

test("auth-service exporta la aplicación Express", () => {
  assert.equal(typeof app, "function");
});
