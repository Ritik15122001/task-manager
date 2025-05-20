import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { TaskContext } from '../context/taskContext';
import TaskItem from './TaskItem';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function TaskList() {
  const { tasks, deleteTask, toggleComplete, reorderTasks } = useContext(TaskContext);
  const [filter, setFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const savedFilter = localStorage.getItem('taskFilter');
    if (savedFilter) {
      setFilter(savedFilter);
      setActiveFilter(savedFilter);
    }
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
    setActiveFilter(newFilter);
    localStorage.setItem('taskFilter', newFilter);
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') return tasks.filter(task => task.completed);
    if (filter === 'pending') return tasks.filter(task => !task.completed);
    return tasks;
  }, [tasks, filter]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100, 
        tolerance: 8, 
      },
    }),
    useSensor(KeyboardSensor) 
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = filteredTasks.findIndex(task => task.id.toString() === active.id);
    const newIndex = filteredTasks.findIndex(task => task.id.toString() === over.id);

    const newFilteredTasks = arrayMove(filteredTasks, oldIndex, newIndex);

    const filteredIds = newFilteredTasks.map(task => task.id);
    const newTasks = [];

    filteredIds.forEach(id => {
      const task = tasks.find(t => t.id === id);
      if (task) newTasks.push(task);
    });


    tasks.forEach(task => {
      if (!filteredIds.includes(task.id)) {
        newTasks.push(task);
      }
    });

    reorderTasks(newTasks);
  };

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (activeId) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeId]);

  return (
    <div className="task-list">
      <div className="filters">
        <button onClick={() => handleFilterChange('all')} className={activeFilter === 'all' ? 'active' : ''}>
          All
        </button>
        <button onClick={() => handleFilterChange('pending')} className={activeFilter === 'pending' ? 'active' : ''}>
          Pending
        </button>
        <button onClick={() => handleFilterChange('completed')} className={activeFilter === 'completed' ? 'active' : ''}>
          Completed
        </button>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filteredTasks.map(task => task.id.toString())} strategy={verticalListSortingStrategy}>
          <ul className="task-items-container">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  id={task.id.toString()}
                  task={task}
                  deleteTask={deleteTask}
                  toggleComplete={toggleComplete}
                />
              ))
            ) : (
              <div className="empty-state">
                <p>No tasks to display</p>
                {filter !== 'all' && (
                  <button onClick={() => handleFilterChange('all')} className="show-all-button">
                    Show all tasks
                  </button>
                )}
              </div>
            )}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}