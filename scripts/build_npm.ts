// @see https://github.com/denoland/dnt

import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "nilto",
    version: Deno.args[0]?.replace(/^v/, ""),
    description: "不動産関連のユーティリティ関数を提供するライブラリ",
    keywords: [],
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/ryohidaka/nilto-js.git",
    },
    author: "ryohidaka",
    bugs: {
      url: "https://github.com/ryohidaka/nilto-js/issues",
    },
    homepage: "https://github.com/ryohidaka/nilto-js#readme",
  },
  compilerOptions: {
    lib: ["ESNext"],
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
