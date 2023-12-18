import { configureStore } from "@reduxjs/toolkit";
import modalSliceReducer from "./modalSlice";
import taskSliceReducer from "./taskSlice";

let store = configureStore({
  reducer: {
    modal: modalSliceReducer,
    tasks: taskSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
