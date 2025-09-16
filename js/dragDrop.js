export class DragDropManager {
  constructor(taskManager, renderer) {
    this.taskManager = taskManager;
    this.renderer = renderer;
    this.draggedElement = null;
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('dragstart', e => {
      if (e.target.classList.contains('task-card')) {
        this.draggedElement = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
      }
    });

    document.addEventListener('dragend', e => {
      if (e.target.classList.contains('task-card')) {
        e.target.classList.remove('dragging');
      }
      document.querySelectorAll('.column').forEach(col => col.classList.remove('drag-over'));
    });

    document.querySelectorAll('.column').forEach(column => {
      column.addEventListener('dragover', e => e.preventDefault());
      column.addEventListener('dragenter', e => column.classList.add('drag-over'));
      column.addEventListener('dragleave', e => column.classList.remove('drag-over'));
      column.addEventListener('drop', e => {
        e.preventDefault();
        const id = parseInt(this.draggedElement.dataset.taskId);
        const status = column.dataset.status;
        this.taskManager.updateTaskStatus(id, status);
        this.renderer.renderBoard();
      });
    });
  }
}
