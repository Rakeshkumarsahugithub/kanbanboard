import { StorageManager } from './storage.js';

export class TaskManager {
  constructor() {
    this.tasks = StorageManager.load('kanban-tasks', []);
    this.nextId = StorageManager.load('kanban-next-id', 1);
  }

  createTask(title, description) {
    const task = {
      id: this.nextId++,
      title: title.trim(),
      description: description.trim(),
      status: 'todo',
      createdAt: new Date().toISOString()
    };
    this.tasks.push(task);
    this.saveTasks();
    return task;
  }

  updateTaskStatus(id, status) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      this.saveTasks();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }

  getTasksByStatus(status) {
    return this.tasks.filter(t => t.status === status);
  }

  saveTasks() {
    StorageManager.save('kanban-tasks', this.tasks);
    StorageManager.save('kanban-next-id', this.nextId);
  }
}
