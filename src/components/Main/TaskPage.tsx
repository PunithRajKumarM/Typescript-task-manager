import { showModal } from "../../store/modalSlice";
import { RootState } from "../../store/store";
import "./TaskPage.css";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../mui/Navbar";
import BasicModal from "../../mui/Modal";
import AddTaskButton from "../../mui/AddTaskButton";
import TaskList from "../../mui/Task";
import { Typography } from "@mui/material";

const TaskPage = () => {
  const modal = useSelector((state: RootState) => state.modal);
  const tasks = useSelector((state: RootState) => state.tasks);

  let displayModal = modal.modal;
  let displayEditModal = modal.editModal;
  console.log("edit", displayEditModal);

  let dispatch = useDispatch();
  console.log(displayModal);

  function handleModal() {
    dispatch(showModal());
  }

  return (
    <div className="taskPageWrapper">
      <Navbar />
      <AddTaskButton handleModal={handleModal} />
      {displayModal && <BasicModal openModal={displayModal} />}
      <div>
        {tasks.length === 0 && (
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h4"
            color={"dodgerblue"}
            textAlign={"center"}
          >
            No tasks found.
          </Typography>
        )}
        {tasks.length > 0 && <TaskList tasks={tasks} />}
      </div>
    </div>
  );
};

export default TaskPage;
