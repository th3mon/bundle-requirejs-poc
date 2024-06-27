requirejs.config({
  baseUrl: "./src",
  paths: {
    // Models: "./Dashboard/Models",
    Models: "../Dashboard/Models",
  },
  waitSeconds: 60,
});

requirejs(["main"]);
