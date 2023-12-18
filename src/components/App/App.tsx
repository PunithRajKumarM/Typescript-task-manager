import { Provider } from "react-redux";
import TaskPage from "../Main/TaskPage";
import store from "../../store/store";

const App = () => {
  return (
    <Provider store={store}>
      <TaskPage />
    </Provider>
  );
};

export default App;
