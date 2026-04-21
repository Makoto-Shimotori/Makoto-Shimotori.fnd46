"use strict";
// 1行目に記載している "use strict" は削除しないでください

const tasks = [];

document.getElementById("addTask").addEventListener("click", () => {
  const text = taskText.value;
  const date = taskDate.value;
  const importance = taskImportance.value;

  if (!text || !date) return;

  const task = { text, date, importance };
  tasks.push(task);

  renderTasks();
});

function renderTasks() {
  ["q1","q2","q3","q4"].forEach(id => {
    const area = document.getElementById(id);
    // タイトルは残し、taskだけ削除
    area.querySelectorAll(".task").forEach(t => t.remove());
  });

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";
    div.innerHTML = `
      ${task.text}<br>
      期限:${task.date}
      <button>済</button>
    `;

    div.querySelector("button").onclick = (e) => {
      e.stopPropagation(); // ★後述
      tasks.splice(index, 1);
      renderTasks();
    };

    div.onclick = () => {
      const newText = prompt("修正内容", task.text);
      if (newText) task.text = newText;
      renderTasks();
    };

    document.getElementById(getQuadrant(task)).appendChild(div);
  });
}

function getQuadrant(task) {
  const now = new Date();
  const due = new Date(task.date);
  const diffDays = (due - now) / 86400000;

  const urgent = diffDays <= 7;
  const important = task.importance === "high";

  if (urgent && important) return "q1";
  if (!urgent && important) return "q2";
  if (!urgent && !important) return "q3";
  return "q4";
}

/* 毎日見直す（自動移動） */
setInterval(renderTasks, 3600000);















