import React, { useReducer, useState } from 'react';
import { TaskReducer } from './TaskReducer';
import { v4 as uuidv4 } from 'uuid';
function Todo() {


  const initialTasks = [
    { id: '1', task: 'Learn React', complete: false },
    { id: '2', task: 'Build a Todo App', complete: false },
    { id: '3', task: 'Read JavaScript Documentation', complete: true },
    { id: '4', task: 'Master CSS Flexbox and Grid', complete: false },
    { id: '5', task: 'Understand useReducer in React', complete: true },
    { id: '11', task: 'Deploy the app using Netlify', complete: false },
    { id: '12', task: 'Write documentation for the project', complete: true },
  ];
  

  const [input, setInput] = useState(''); // Task input state
  const [tasks, dispatch] = useReducer(TaskReducer, initialTasks); // Task list state

  const [deleting,setDeleting]=useState('')
  const [newTaskId,setNewTaskId]=useState('')
  // Handle task save
  const handleSave = () => {
    if (input.trim() === '') return; // Ignore empty input
    const newId = uuidv4();
    dispatch({ type: 'save', task: input, id: newId });
    setInput(''); // Clear input field

    setNewTaskId(newId);
    setTimeout(() => {
      setNewTaskId(null);
    }, 500);
  };

  // Handle task update inline (user types directly into the table)
  const handleUpdateTask = (id, updatedTask) => {
    dispatch({ type: 'edit', editId: id, updatedTask });
  };

  // Handle task completion toggle
  const handleComplete = (id) => {
    dispatch({ type: 'complete', id });
  };

  // Handle task deletion
  const handleDelete = (id) => {
    setDeleting(id)
    setTimeout(() => {
      dispatch({ type: 'delete', id });
      setDeleting(null)
    }, 500);
  };

  return (
    <div>
      {/* Input field for new task */}
      <div className="input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter your task"
        />
        <button onClick={handleSave}>Save</button>
      </div>

      {/* Task List with inline editing */}
      <div>
        <table>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id} 
              className = {`${newTaskId === task.id ? 'adding' : ''}  ${deleting === task.id ? 'deleting' : ''}`}>
                <td className='index'>{index + 1}</td>
                <td>
                  <input
                    className={`edit-input ${task.complete ? 'strike' : ''}`}

                    type="text"
                    value={task.task}
                    onChange={(e) => handleUpdateTask(task.id, e.target.value)}
                  />
                </td>
                <td>
                  <button className={task.complete?"done":"not-done"} onClick={() => handleComplete(task.id)}>
                    {task.complete ? 'Done' : 'Not Done'}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Todo;
