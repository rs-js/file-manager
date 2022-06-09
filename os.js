import os from "os";
import { EOL } from "os";

switch (process.argv.slice(2)[0]) {
  case "EOL":
    process.send("hello" + EOL + "world");
    break;
  case "cpus":
    process.send(os.cpus());
    break;
  case "homedir":
    process.send(os.userInfo().homedir);
    break;
  case "username":
    process.send(os.userInfo().username);
    break;
  case "architecture":
    process.send(os.arch());
    break;
  default:
    process.send("Invalid input");
}
