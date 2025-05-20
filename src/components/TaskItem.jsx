import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskItem = ({ id, task, deleteTask, toggleComplete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    zIndex: isDragging ? 999 : 'auto',
    touchAction: 'none', // Disable browser handling of touch gestures
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`task-item ${task.completed ? 'completed' : ''}`}
    >
      <div className='parent'>
        <div 
          className="drag-handle" 
          {...attributes} 
          {...listeners} 
          style={{ 
            cursor: 'grab', 
            paddingRight: '8px',
            touchAction: 'none',
          }}
        >
          ☰
        </div>
        <div className="task-content">
          <button onClick={() => toggleComplete(task.id)} className="complete-button">
            {task.completed ? '✓' : '○'}
          </button>
          <span onClick={() => toggleComplete(task.id)}>
            {task.text}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => deleteTask(task.id)} className="delete-button">
          ✕
        </button>
      </div>
    </li>
  );
};

export default React.memo(TaskItem);