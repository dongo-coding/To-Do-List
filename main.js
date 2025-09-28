const fs = require("fs");
const file = "tasks.json";

function loadTasks() {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file));
}

function saveTasks(tasks) {
  fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
}
const cmd = process.argv[2];
const input = process.argv.slice(3).join(" ");
let tasks = loadTasks();

if (cmd === "add") {
  tasks.push({ task: input, done: false });
  saveTasks(tasks);
  console.log(`Added: ${input}`);
} else if (cmd === "list") {
  tasks.forEach((t, i) =>
    console.log(`${i + 1}. [${t.done ? "✔" : " "}] ${t.task}`)
  );
} else if (cmd === "done") {
  const index = parseInt(process.argv[3]) - 1;
  if (tasks[index]) {
    tasks[index].done = true;
    saveTasks(tasks);
    console.log(`Marked as done: ${tasks[index].task}`);
  }
} else {
  console.log("Usage: node main.js [add|list|done] <task>");
}
