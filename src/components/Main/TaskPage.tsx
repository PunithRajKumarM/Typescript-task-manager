import { showEditModal, showModal } from "../../store/modalSlice";
import { RootState } from "../../store/store";
import { Task, editTask, removeTask } from "../../store/taskSlice";
import EditModal from "../Modal/EditModal";
import Modal from "../Modal/Modal";
import "./TaskPage.css";
import { useDispatch, useSelector } from "react-redux";

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
      <div className="taskPage">
        <h1>Task Manager</h1>
        <button className="taskPageButton" onClick={handleModal}>
          Add Task
        </button>
      </div>
      {displayModal && <Modal />}

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
                    <button onClick={() => handleOpenEditModal(task)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTask(task)}>
                      Delete
                    </button>
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
