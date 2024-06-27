const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const requirejsOptimize = require("gulp-requirejs-optimize");
const { src, dest, parallel, series } = require("gulp");

// INFO: wywołanie poniższej linii generuje ten sam błąd co plugpluginu requirejsOptimize.
// npx r.js -o name=main out=built.js baseUrl=src mainConfigFile=src/boot.js
function jsBundle() {
  return (
    src(["src/**/*.js", "!src/**/main.js"])
      .pipe(
        requirejsOptimize({
          // name: "boot",
          optimize: "none",
          mainConfigFile: "src/boot.js", // INFO: Poprawna wartość
        }),
      )
      .pipe(concat("app-bundle.js"))
      // .pipe(uglify())
      .pipe(dest("dist"))
  );
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

exports.default = series(
  clean,
  parallel(jsBundle, copyVendorFiles, copyCSSFiles, copyHTMLFiles),
);
