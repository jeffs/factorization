import util from "node:util";
import child_process from "node:child_process";
import { copyFile } from "node:fs/promises";

const exec = util.promisify(child_process.exec);

async function build() {
  const promise = exec("wasm-pack build --target no-modules", {
    cwd: "wasm/factorization",
  });
  promise.child.stdout.on("data", (data) => {
    process.stdout.write(data);
  });
  promise.child.stderr.on("data", (data) => {
    process.stderr.write(data);
  });
  promise.child.on("close", (status) => {
    if (status !== 0) {
      console.error(`error: child exited with status ${status}`);
      process.exit(status);
    }
  });
  await promise;
}

async function main() {
  try {
    await build();
    await Promise.all([
      copyFile(
        "wasm/factorization/pkg/factorization.js",
        "src/workers/wasm-factorization.js"
      ),
      copyFile(
        "wasm/factorization/pkg/factorization_bg.wasm",
        "src/workers/wasm-factorization-worker_bg.wasm"
      ),
    ]);
  } catch (error) {
    console.error(`error: ${error}`);
  }
}

main();
