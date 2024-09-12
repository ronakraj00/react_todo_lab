import { useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Todo() {
  const [input, setInput] = useState('');
  const [tasks, dispatch] = useReducer(Taskreducer, []);
  const [isSave, setIsSave] = useState(true);
  const [editId, setEditId] = useState('');

  function handleEdit(id) {
    setIsSave(false);
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setInput(taskToEdit.task);
      setEditId(taskToEdit.id);
    }
  }

  function handleSave() {
    if (isSave) {
      dispatch({ type: 'save', task: input });
      setInput('');
    } else {
      dispatch({ type: 'edit', editId, updatedTask: input });
      setInput('');
      setIsSave(true);
    }
  }

  function handleComplete(id) {
    dispatch({ type: 'complete', id });
  }

  function handleDelete(id) {
    dispatch({ type: 'delete', id });
  }

  return (
    <>
      <div className="input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
        <button onClick={handleSave}>Save</button>
      </div>
      <div>
        <table>
          <tbody>
            {tasks.map((task, index) => {
              return (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.task}</td>
                  <td>
                    <button onClick={() => handleEdit(task.id)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleComplete(task.id)}>
                      {task.complete ? 'Done' : 'Not Done'}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

const Taskreducer = (state, action) => {
  switch (action.type) {
    case 'save':
      return [...state, { task: action.task, id: uuidv4(), complete: false }];
    case 'edit':
      return state.map((t) =>
        t.id === action.editId ? { ...t, task: action.updatedTask } : t
      );
    case 'complete':
      return state.map((t) =>
        t.id === action.id ? { ...t, complete: !t.complete } : t
      );
    case 'delete':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
};

export default Todo;
