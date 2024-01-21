import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Task, editTask, removeTask } from "../store/taskSlice";
import EditModal from "./EditModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { showEditModal } from "../store/modalSlice";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const modal = useSelector((state: RootState) => state.modal);
  let dispatch = useDispatch();

  let displayEditModal = modal.editModal;

  function handleDeleteTask(task: Task) {
    dispatch(removeTask(task));
  }

  function handleOpenEditModal(task: Task) {
    dispatch(editTask(task));
    dispatch(showEditModal());
  }
  return (
    <div className="TaskListMui">
      {displayEditModal && <EditModal openModal={displayEditModal} />}
      {tasks.map((task) => (
        <Card sx={{ maxWidth: 345 }} key={task.id}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="p"
              style={{ color: "#1976d2" }}
            >
              {task.taskName.charAt(0).toUpperCase() + task.taskName.slice(1)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {task.taskDescription.charAt(0).toUpperCase() +
                task.taskDescription.slice(1)}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {task.isEdited
                ? `Edited on ${task.submittedTime}`
                : `Submitted on ${task.submittedTime}`}
            </Typography>
          </CardContent>
          <CardActions>
            <div>
              <EditIcon
                style={{ color: "#1976d2" }}
                onClick={() => handleOpenEditModal(task)}
              />
              <DeleteIcon
                style={{ color: "#1976d2" }}
                onClick={() => handleDeleteTask(task)}
              />
            </div>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
