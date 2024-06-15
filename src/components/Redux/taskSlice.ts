// src/redux/taskSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  urgency: 'urgent' | 'high' | 'low';
  status: 'new' | 'inprogress' | 'done';
  date: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'date' | 'status'>>) => {
      const newTask = {
        ...action.payload,
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        status: 'new' as 'new' | 'inprogress' | 'done',
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
