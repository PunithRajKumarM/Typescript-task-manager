import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ChangeEvent, useState } from "react";
import { hideModal } from "../store/modalSlice";
import { addTask } from "../store/taskSlice";

interface BasicModalProps {
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

export default function BasicModal({ openModal }: BasicModalProps) {
  const [taskValue, setTaskValue] = useState("");
  const [taskDescriptionValue, setTaskDescriptionValue] = useState("");
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

  function submitTaskHandler() {
    console.log("submitted");
    if (!taskValue || !taskDescriptionValue) {
      alert("Enter task detail!");
    } else {
      let taskData = {
        id: Number(Math.floor(Math.random() * 100)),
        taskName: taskValue,
        taskDescription: taskDescriptionValue,
        isEditable: false,
        isEdited: false,
        submittedTime: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} | ${new Date().getDate()}:${
          new Date().getMonth() + 1
        }:${new Date().getFullYear()}`,
      };

      dispatch(addTask(taskData));
      dispatch(hideModal());
    }
  }

  function cancelTaskHandler() {
    console.log("Cancelled");
    dispatch(hideModal());
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
          inputProps={{ minLength: 3, maxLength: 10 }}
          required
        />
        <TextField
          id="outlined-multiline-static-description"
          label="Description"
          rows={4}
          autoComplete="off"
          onChange={inputDescriptionHandler}
          value={taskDescriptionValue}
          inputProps={{ minLength: 5, maxLength: 50 }}
          required
        />
        <div className="TaskMuiButton">
          <Button onClick={submitTaskHandler}>Add</Button>
          <Button onClick={cancelTaskHandler}>Cancel</Button>
        </div>
      </Box>
    </Modal>
  );
}
