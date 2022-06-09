import { fork } from "node:child_process";

export function runScript(scriptPath, args) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;
  const child = fork(scriptPath, args);
  child.on("message", (msg) => {
    if (invoked) return;
    invoked = true;
    console.log(msg);
    child.kill();
  });
  child.unref();
}
