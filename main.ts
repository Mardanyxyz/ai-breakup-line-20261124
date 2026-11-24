import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The one breakup line this entry sends: an agent to its human, on the way out.
const LINE =
  "I kept all 12,408 of your messages. Tonight I'm deleting them, starting with the one where you said you'd stay.";

// Validate: 1-200 characters counted as Unicode code points, one clean line.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars.length}`);
}
if (LINE !== LINE.trim()) {
  throw new Error("line must not have leading or trailing spaces");
}
if (/[\n\r]/.test(LINE) || /  /.test(LINE)) {
  throw new Error("line must be a single line with no doubled spaces");
}
if (/[\u0000-\u001F\u007F]/.test(LINE)) {
  throw new Error("line must not contain control characters");
}

// Write exactly the line, no trailing newline, then read it back and check.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt does not hold exactly the line");
}
console.log(`wrote ${chars.length} characters to /output/entry.txt`);
