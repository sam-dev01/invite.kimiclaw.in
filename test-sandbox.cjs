const fs = require("fs");
const { JSDOM } = require("jsdom");

async function main() {
  const html = fs.readFileSync("./index.html", "utf8");
  const js = fs.readFileSync("./app.js", "utf8");

  const dom = new JSDOM(html, { runScripts: "outside-only" });
  const { window } = dom;
  const { document } = window;

  // Polyfill globals
  global.window = window;
  global.document = document;
  global.navigator = window.navigator;
  global.localStorage = {
    getItem: () => "[]",
    setItem: () => {}
  };
  global.alert = (msg) => console.log("ALERT:", msg);

  try {
    eval(js);
  } catch (error) {
    console.error("Evaluation error:", error);
    return;
  }

  // Trigger init (DOMContentLoaded)
  const event = document.createEvent("Event");
  event.initEvent("DOMContentLoaded", true, true);
  document.dispatchEvent(event);

  const displayBox = document.querySelector("#sim-display-box");
  console.log("--- SIM DISPLAY BOX INNER HTML ---");
  console.log(displayBox ? displayBox.innerHTML.trim() : "NOT FOUND");
}

main().catch(console.error);
