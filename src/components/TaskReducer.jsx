

export const TaskReducer = (state, action) => {
  switch (action.type) {
    case 'save':
      return [...state, { task: action.task, id:action.id, complete: false }];
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
