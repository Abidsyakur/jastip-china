import { test } from "node:test";
import assert from "node:assert/strict";
import { buatTokenAcak, hashToken } from "../token-hash";

test("token acak yang dibuat berbeda tiap panggilan", () => {
  assert.notEqual(buatTokenAcak(), buatTokenAcak());
});

test("hash dari token yang sama selalu menghasilkan hash yang sama (deterministik)", () => {
  const token = buatTokenAcak();
  assert.equal(hashToken(token), hashToken(token));
});

test("hash dari dua token berbeda menghasilkan hash berbeda", () => {
  assert.notEqual(hashToken(buatTokenAcak()), hashToken(buatTokenAcak()));
});

test("hash tidak sama dengan token aslinya (bukan cuma passthrough)", () => {
  const token = buatTokenAcak();
  assert.notEqual(hashToken(token), token);
});