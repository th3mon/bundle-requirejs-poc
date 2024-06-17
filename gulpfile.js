const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const requirejsOptimize = require("gulp-requirejs-optimize");
const { src, dest, parallel, series } = require("gulp");

function jsBundle() {
  return src("src/main.js")
    .pipe(
      requirejsOptimize({
        optimize: "none",
        out: "app-bundle.js",
      }),
    )
    .pipe(uglify())
    .pipe(dest("dist"));
}

function copyVendorFiles() {
  return src("vendors/**/*.*").pipe(dest("dist/vendors"));
}

function copyCSSFiles() {
  return src("css/**/*.css").pipe(dest("dist/css"));
}

function copyHTMLFiles() {
  return src("index.dist.html").pipe(rename("index.html")).pipe(dest("dist"));
}

async function clean() {
  const del = await import("del");

  return del.deleteAsync(["dist/**", "!dist"], { force: true });
}

exports.build = jsBundle;
exports.default = series(
  clean,
  parallel(jsBundle, copyVendorFiles, copyCSSFiles, copyHTMLFiles),
);
