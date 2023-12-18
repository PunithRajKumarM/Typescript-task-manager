import { createPortal } from "react-dom";
import "./Modal.css";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/taskSlice";
import { hideEditModal } from "../../store/modalSlice";
import { RootState } from "../../store/store";

const EditModal: FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const isEdit = useSelector((state: RootState) => state.modal).editModal;
  const taskToBeEdited = tasks.find((task) => task.isEditable === true);

  const [taskNameValue, setTaskNameValue] = useState(taskToBeEdited?.taskName);
  const [taskDescriptionValue, setTaskDescriptionValue] = useState(
    taskToBeEdited?.taskDescription
  );

  console.log("Tasks", tasks);
  console.log("Edit", isEdit);

  const dispatch = useDispatch();

  function handleTaskName(e: ChangeEvent<HTMLInputElement>) {
    setTaskNameValue(e.target.value);
  }
  function handleTaskDescription(e: ChangeEvent<HTMLTextAreaElement>) {
    setTaskDescriptionValue(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const taskName = fd.get("taskName");
    const taskDescription = fd.get("taskDescription");

    if (taskToBeEdited) {
      let taskData = {
        id: taskToBeEdited.id,
        taskName,
        taskDescription,
        isEditable: true,
        isEdited: true,
        submittedTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} | ${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}`,
      };
      dispatch(addTask(taskData));
      dispatch(hideEditModal());
    }
  }

  return createPortal(
    <div className="modalWrapper">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <table className="modalFormTable">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="taskName">Task title</label>
                </td>
                <td>
                  <input
                    id="taskName"
                    name="taskName"
                    type="text"
                    placeholder="Enter the task title"
                    autoComplete="off"
                    onChange={handleTaskName}
                    value={taskNameValue}
                    required
                    minLength={4}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="taskDescription">Task Description</label>
                </td>
                <td>
                  <textarea
                    id="taskDescription"
                    placeholder="Enter the description"
                    autoComplete="off"
                    name="taskDescription"
                    onChange={handleTaskDescription}
                    value={taskDescriptionValue}
                    required
                    minLength={8}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="modal-button">
                  <button type="submit" className="modalSaveButton">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>,
    document.getElementById("editModal")!
  );
};

export default EditModal;
