#!/usr/bin/env node
const commandLineArgs = require("command-line-args");
const commandLineUsage = require("command-line-usage");
const buildGraph = require("json-graph-deps");

process.on("uncaughtException", e => {
  console.log(e.message);
  console.log(help);
  process.exit(1);
});

// Option definitions
const options = [
  {
    name: "dir",
    alias: "d",
    type: String,
    defaultOption: true,
    description: "base directory to do the search",
  },
  { name: "ignore", alias: "i", type: String, multiple: true, description: "files or folders to ignore" },
  { name: "help", alias: "h", type: Boolean, description: "print this usage guide" },
];

// Help definitions
const help = commandLineUsage([
  { header: "depgraph", content: "generates a dependency graph in dot notation" },
  { header: "options", optionList: options },
]);

// Parse options
const parsedOptions = commandLineArgs(options);

if (parsedOptions.help) {
  console.log(help);
  process.exit(0);
}

buildGraph({ cwd: parsedOptions.dir, ignored: parsedOptions.ignore }).then(graph => {
  console.log(JSON.stringify({ graph }));
  process.exit(0);
});
