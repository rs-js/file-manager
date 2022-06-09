import { existsSync, createReadStream, createWriteStream } from "fs";
import { readdir, rename, copyFile, mkdir, rm } from "fs/promises";

const argv = process.argv.slice(2);
const command = argv[0];
const dirPath = argv[1];
const dirPath2 = argv[2];

(async function () {
  const isExist = existsSync(dirPath2);
  try {
    switch (command) {
      case "ls":
        const list = await readdir(process.cwd());
        list.forEach(function (file) {
          console.log(file);
        });
        break;
      case "cat":
        const readStream = createReadStream(dirPath, "utf-8");
        readStream.on("data", (data) => process.send(data));
        readStream.on("error", () => process.send("Operation failed"));
        break;
      case "add":
        const writeStream = createWriteStream(dirPath);
        writeStream.write("", "utf-8");
        writeStream.on("finish", () => {
          process.send("Done");
        });
        writeStream.on("error", () => process.send("Operation failed"));
        writeStream.end();
        break;
      case "rn":
        await rename(dirPath, dirPath2);
        process.send("Done");
        break;
      case "cp":
        if (!isExist) await mkdir(dirPath2);
        await copyFile(dirPath, `${dirPath2}/${dirPath}`);
        process.send("Done");
        break;
      case "mv":
        if (!isExist) await mkdir(dirPath2);
        await rename(dirPath, `${dirPath2}/${dirPath}`);
        process.send("Done");
        break;
      case "rm":
        await rm(dirPath);
        process.send("Done");
        break;
      default:
        process.send("Invalid input");
    }
  } catch {
    process.send("Operation failed");
    return;
  }
})();
