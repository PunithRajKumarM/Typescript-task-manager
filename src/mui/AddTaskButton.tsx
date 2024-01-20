import { Button } from "@mui/material";
import { MouseEventHandler } from "react";

interface InputFieldProps {
  handleModal: MouseEventHandler<HTMLButtonElement>;
}

export default function AddTaskButton({ handleModal }: InputFieldProps) {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Button
        className="taskPageButton"
        onClick={handleModal}
        variant="contained"
      >
        Add Task
      </Button>
    </div>
  );
}
