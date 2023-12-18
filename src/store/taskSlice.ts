import { createSlice } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  taskName: string;
  taskDescription: string;
  isEditable: boolean;
  isEdited: boolean;
  submittedTime: string;
}

interface TaskState<T> extends Array<T> {}

const storedTasks = localStorage.getItem("tasks");
const initialState: TaskState<Task> = storedTasks
  ? JSON.parse(storedTasks)
  : [];

let taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      let existingTaskIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );

      if (existingTaskIndex === -1) {
        state.push(action.payload);
      } else {
        let existingTask = state[existingTaskIndex];
        existingTask.taskName = action.payload.taskName;
        existingTask.taskDescription = action.payload.taskDescription;
        existingTask.isEdited = true;
        existingTask.isEditable = false;
        existingTask.submittedTime = action.payload.submittedTime;
        state[existingTaskIndex] = existingTask;
      }

      localStorage.setItem("tasks", JSON.stringify(state));
      return state;
    },

    removeTask(state, action) {
      let updatedState = state.filter((task) => task.id !== action.payload.id);
      localStorage.setItem("tasks", JSON.stringify(updatedState));
      return updatedState;
    },

    editTask(state, action) {
      let existingTaskIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      state[existingTaskIndex].isEditable = true;
      return state;
    },
  },
});

export const { addTask, removeTask, editTask } = taskSlice.actions;

export default taskSlice.reducer;
