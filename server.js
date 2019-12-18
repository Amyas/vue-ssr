const express = require("express");
const app = express();

const { createBundleRenderer } = require("vue-server-renderer");

const template = require("fs").readFileSync(
  "./src/index.template.html",
  "utf-8"
);
const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
});

app.use("/dist", express.static("./dist"));

app.get("*", (req, res) => {
  const context = {
    url: req.url
  };
  renderer
    .renderToString(context)
    .then(html => {
      res.send(html);
    })
    .catch(err => {
      if (err.code === 404) {
        res.status(404).end("Page not found");
      } else {
        res.status(500).end("Internal Server Error");
      }
    });
});

app.listen(8080);
