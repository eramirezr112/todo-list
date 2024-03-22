import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function ToDoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = () => {
    if (task.trim() !== "") {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, text: task, completed: false },
      ]);
      setTask("");
    }
  };

  const handleEdit = (id, newText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4" component="h4">
            TO-DO LIST
          </Typography>
          <Divider />
          <TextField
            label="Add Task"
            variant="outlined"
            value={task}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Add
          </Button>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                  }
                  label={task.completed ? <s>{task.text}</s> : task.text}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() =>
                      handleEdit(task.id, prompt("Edit Task", task.text))
                    }
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(task.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ToDoList;
