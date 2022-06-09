import { createHash } from "crypto";
import { createReadStream } from "fs";

try {
  const filePath = process.argv.slice(2)[0];
  const hash = createHash("sha256");
  const input = createReadStream(filePath);
  input.on("readable", () => {
    const data = input.read();
    if (data) hash.update(data);
    else {
      process.send(`${hash.digest("hex")} ${filePath}`);
    }
  });
  input.on("error", () => process.send("Operation failed"));
} catch {
  process.send("Operation failed");
}
