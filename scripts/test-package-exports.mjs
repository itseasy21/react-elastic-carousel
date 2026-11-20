import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const packageName = "@itseasy21/react-elastic-carousel";
const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const temporaryRoot = mkdtempSync(join(projectRoot, ".package-smoke-"));
const packageRoot = join(
  temporaryRoot,
  "node_modules",
  "@itseasy21",
  "react-elastic-carousel"
);
const archivePath = join(temporaryRoot, "package.tgz");

const runNode = file =>
  execFileSync(process.execPath, [file], {
    cwd: temporaryRoot,
    encoding: "utf8",
    stdio: "pipe"
  });

try {
  execFileSync("yarn", ["pack", "--out", archivePath], {
    cwd: projectRoot,
    stdio: "pipe"
  });
  mkdirSync(packageRoot, { recursive: true });
  execFileSync(
    "tar",
    ["-xzf", archivePath, "--strip-components=1", "-C", packageRoot],
    { stdio: "pipe" }
  );

  const commonJsTest = join(temporaryRoot, "require.cjs");
  writeFileSync(
    commonJsTest,
    `const packageExports = require("${packageName}");
const Carousel = packageExports.default || packageExports;
if (typeof Carousel !== "function") throw new Error("CommonJS export is not a component");
if (!packageExports.consts) throw new Error("CommonJS named exports are missing");
console.log("commonjs ok");
`
  );

  const esModuleTest = join(temporaryRoot, "import.mjs");
  writeFileSync(
    esModuleTest,
    `import Carousel from "${packageName}";
if (typeof Carousel !== "function") throw new Error("ES module export is not a component");
console.log("esm ok");
`
  );

  assert.match(runNode(commonJsTest), /commonjs ok/);
  assert.match(runNode(esModuleTest), /esm ok/);
  console.log("Packed CommonJS and ES module exports load successfully.");
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}
