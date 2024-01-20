import { showEditModal, showModal } from "../../store/modalSlice";
import { RootState } from "../../store/store";
import { Task, editTask, removeTask } from "../../store/taskSlice";
import EditModal from "../Modal/EditModal";
// import Modal from "../Modal/Modal";
import "./TaskPage.css";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Navbar from "../../mui/Navbar";
import { Button } from "@mui/material";
import BasicModal from "../../mui/Modal";
import AddTaskButton from "../../mui/AddTaskButton";

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

  function handleDeleteTask(task: Task) {
    dispatch(removeTask(task));
  }

  function handleOpenEditModal(task: Task) {
    dispatch(editTask(task));
    dispatch(showEditModal());
  }

  return (
    <div className="taskPageWrapper">
      <Navbar />
      <AddTaskButton handleModal={handleModal} />
      {displayModal && <BasicModal openModal={displayModal} />}
      <div className="tasksList">
        {tasks.length === 0 && <p className="noTaskText">No tasks available</p>}
        {tasks.length > 0 && (
          <>
            {tasks.map((task) => (
              <div key={task.id} className="taskListWrapper">
                {displayEditModal && <EditModal />}
                <div className="taskList">
                  <h3>{task.taskName}</h3>
                  <p>{task.taskDescription}</p>
                  <div className="taskButtons">
                    <EditIcon onClick={() => handleOpenEditModal(task)} />
                    <DeleteIcon onClick={() => handleDeleteTask(task)} />
                  </div>
                </div>
                <div className="taskListTime">
                  {task.isEdited
                    ? `Edited on ${task.submittedTime}`
                    : `Submitted on ${task.submittedTime}`}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
