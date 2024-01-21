import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ChangeEvent, useState } from "react";
import { hideEditModal } from "../store/modalSlice";
import { addTask } from "../store/taskSlice";

interface EditModalProps {
  openModal: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  p: 2,
};

export default function EditModal({ openModal }: EditModalProps) {
  const tasks = useSelector((state: RootState) => state.tasks);
  // const isEdit = useSelector((state: RootState) => state.modal).editModal;
  const taskToBeEdited = tasks.find((task) => task.isEditable === true);

  console.log(taskToBeEdited);

  const [taskValue, setTaskValue] = useState(taskToBeEdited?.taskName);
  const [taskDescriptionValue, setTaskDescriptionValue] = useState(
    taskToBeEdited?.taskDescription
  );
  const dispatch = useDispatch();

  const modal = useSelector((state: RootState) => state.modal);
  let displayModal = modal.modal;
  console.log(displayModal);

  function inputTaskHandler(e: ChangeEvent<HTMLInputElement>) {
    setTaskValue(e.target.value);
  }

  function inputDescriptionHandler(e: ChangeEvent<HTMLInputElement>) {
    setTaskDescriptionValue(e.target.value);
  }

  function submitEditedTaskHandler() {
    console.log("submitted");
    if (!taskValue || !taskDescriptionValue) {
      alert("Enter task detail!");
    } else {
      let taskData = {
        id: taskToBeEdited?.id,
        taskName: taskValue,
        taskDescription: taskDescriptionValue,
        isEditable: true,
        isEdited: true,
        submittedTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} | ${new Date().getDate()}:${
          new Date().getMonth() + 1
        }:${new Date().getFullYear()}`,
      };

      dispatch(addTask(taskData));
      dispatch(hideEditModal());
    }
  }

  function cancelEditTaskHandler() {
    console.log("Cancelled");
    dispatch(hideEditModal());
  }

  return (
    <Modal
      open={openModal}
      // onClose={}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h4"
          color={"dodgerblue"}
          textAlign={"center"}
        >
          Add task
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="Task"
          rows={4}
          autoComplete="off"
          onChange={inputTaskHandler}
          value={taskValue}
          inputProps={{ minLength: 3, maxLength: 50 }}
          required
        />
        <TextField
          id="outlined-multiline-static-description"
          label="Description"
          rows={4}
          autoComplete="off"
          onChange={inputDescriptionHandler}
          value={taskDescriptionValue}
          inputProps={{ minLength: 5, maxLength: 100 }}
          required
        />
        <div className="TaskMuiButton">
          <Button onClick={submitEditedTaskHandler}>Edit</Button>
          <Button onClick={cancelEditTaskHandler}>Cancel</Button>
        </div>
      </Box>
    </Modal>
  );
}
