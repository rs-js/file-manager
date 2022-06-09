import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createBrotliCompress } from "zlib";

const filePaths = process.argv.slice(2);
const path_to_file = filePaths[0];
const path_to_destination = filePaths[1];

async function run() {
  await pipeline(
    createReadStream(path_to_file),
    createBrotliCompress(),
    createWriteStream(path_to_destination)
  );
}

run()
  .then(() => process.send("Done"))
  .catch(() => process.send("Operation failed"));
