import readline from "readline";
import { runScript } from "./script.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const homeDir = process.env.HOME;
const workDir = process.cwd();
process.chdir(homeDir);
const pathString = "You are currently in";
const username = process.argv.slice(2)[0];
let user = "";
const greeting = (currentUser) => {
  user = currentUser;
  console.log(`Welcome to the File Manager, ${currentUser}!`);
};
if (username?.startsWith("--username=")) {
  greeting(username.replace("--username=", ""));
  console.log(pathString, process.cwd());
} else {
  rl.question("Hi, what is your name?\n", (name) => {
    greeting(name);
    console.log(pathString, process.cwd());
  });
}

rl.on("line", (res) => {
  console.log(`Received: ${res}`);
  const command = res.split(" ")[0];
  const input1 = res.split(" ")[1];
  const input2 = res.split(" ")[2];
  const error = "Invalid input";
  switch (command) {
    case "up":
      if (process.cwd() === homeDir) {
        console.log(error);
      } else {
        process.chdir("../");
        console.log(pathString, process.cwd());
      }
      break;
    case "cd":
      try {
        process.chdir(input1);
        console.log(pathString, process.cwd());
      } catch {
        console.log(error);
      }
      break;
    case "ls":
    case "cat":
    case "add":
    case "rn":
    case "cp":
    case "mv":
    case "rm":
      runScript(workDir + "/fs.js", [command, input1, input2]);
      break;
    case "os":
      runScript(workDir + "/os.js", [input1?.replace("--", "")]);
      break;
    case "hash":
      runScript(workDir + "/hash.js", [input1]);
      break;
    case "compress":
      runScript(workDir + "/compress.js", [input1, `${input2}/${input1}.br`]);
      break;
    case "decompress":
      runScript(workDir + "/decompress.js", [
        input1,
        `${input2}/decompressedFile`,
      ]);
      break;
    case ".exit":
      process.exit();
    default:
      console.log(error);
  }
});
process.on("exit", () => {
  console.log(`Thank you for using File Manager, ${user}!`);
});
