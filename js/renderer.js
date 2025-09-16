import { DOMUtils } from './domUtils.js';

export class UIRenderer {
  constructor(taskManager) {
    this.taskManager = taskManager;
  }

  renderBoard() {
    ['todo', 'progress', 'done'].forEach(status => this.renderColumn(status));
  }

  renderColumn(status) {
    const container = document.getElementById(`${status}-tasks`);
    const tasks = this.taskManager.getTasksByStatus(status);
    container.innerHTML = '';

    if (tasks.length === 0) {
      container.innerHTML = `<div class="empty-state">No tasks yet.</div>`;
      return;
    }

    tasks.forEach(task => container.appendChild(this.createCard(task)));
  }

  createCard(task) {
    const card = DOMUtils.createElement('div', {
      class: 'task-card',
      draggable: 'true',
      dataset: { taskId: task.id }
    });

    const deleteBtn = DOMUtils.createElement('button', {
      class: 'delete-btn',
      title: 'Delete task'
    }, '×');

    deleteBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (confirm('Delete this task?')) {
        this.taskManager.deleteTask(task.id);
        this.renderBoard();
      }
    });

    card.appendChild(deleteBtn);
    card.appendChild(DOMUtils.createElement('div', { class: 'task-title' }, task.title));
    card.appendChild(DOMUtils.createElement('div', { class: 'task-description' }, task.description || 'No description'));

    return card;
  }

  clearForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
  }
}
