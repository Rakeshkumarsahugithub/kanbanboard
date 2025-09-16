import { TaskManager } from './taskManager.js';
import { UIRenderer } from './renderer.js';
import { DragDropManager } from './dragDrop.js';

document.addEventListener('DOMContentLoaded', () => {
  const taskManager = new TaskManager();
  const renderer = new UIRenderer(taskManager);
  new DragDropManager(taskManager, renderer);

  renderer.renderBoard();

  const addBtn = document.getElementById('addTaskBtn');
  addBtn.addEventListener('click', () => {
    const title = document.getElementById('taskTitle').value.trim();
    const desc = document.getElementById('taskDescription').value.trim();
    if (!title) return alert('Task title is required');

    taskManager.createTask(title, desc);
    renderer.renderBoard();
    renderer.clearForm();
  });
});
