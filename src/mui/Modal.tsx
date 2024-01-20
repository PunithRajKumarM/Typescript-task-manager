import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";

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
  return (
    <Modal
      open={openModal}
      // onClose
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
        <TextField id="outlined-multiline-static" label="Task" rows={4} />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          rows={4}
        />
        <div className="TaskMuiButton">
          <Button>Add</Button>
          <Button>Cancel</Button>
        </div>
      </Box>
    </Modal>
  );
}
