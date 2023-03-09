import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { argv, exit } from "node:process";

const [, , composerPath, modulePath] = argv;
assert.ok(composerPath, "Please provide absolute path to composer.json file");
assert.ok(modulePath, "Please provide absolute path to the modules location");

let absPath = path.resolve(composerPath);

let rawComposerContents = fs.readFileSync(absPath, { encoding: "utf-8" });

const moduleName = "newfold-labs/wp-module-ecommerce";

let repository = {
  type: "path",
  url: `${modulePath}/${moduleName}`,
  only: [moduleName],
  options: { symlink: false },
};

try {
  let composerJson = JSON.parse(rawComposerContents);
  delete composerJson.repositories.newfold.only;
  composerJson.repositories.newfold.exclude = [moduleName];
  composerJson.repositories.module = repository;
  composerJson.require[moduleName] = "@dev";
  fs.writeFileSync(absPath, JSON.stringify(composerJson, null, 2), {
    encoding: "utf-8",
  });
} catch (error) {
  console.error(error);
  exit(1);
}
