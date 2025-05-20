import React, { useState, useContext, useCallback } from 'react';
import { TaskContext } from '../context/taskContext';

export default function TaskForm() {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Task cannot be empty');
      return;
    }
    
    addTask(text);
    setText('');
    setError('');
  }, [text, addTask]);

  const handleChange = useCallback((e) => {
    setText(e.target.value);
    if (error) setError('');
  }, [error]);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="What needs to be done?"
          aria-label="New task input"
          className={error ? 'input-error' : ''}
        />
        {error && <div className="error-message">{error}</div>}
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}