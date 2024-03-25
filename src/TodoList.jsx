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
import { Delete, Edit, More } from "@mui/icons-material";

function ToDoList() {
  const [isEditing, setIsEditing] = useState("");
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    if (input.trim() === "") {
      return;
    }
    if (isEditing) {
      const updatedTasks = tasks.map((t) => {
        if (t.id === isEditing) {
          return { ...t, text: input };
        }
        return t;
      });
      setTasks(updatedTasks);
      setIsEditing("");
      setInput("");
      return;
    }
    const newTask = {
      id: tasks.length + 1,
      text: input,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const handleEdit = (id) => {
    setIsEditing(id);
    setInput(tasks.find((task) => task.id === id).text);
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
            label={isEditing ? "Edit Task" : "Add Task"}
            variant="outlined"
            value={input}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            {isEditing ? "Edit Task" : "Add Task"}
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
                  <IconButton onClick={() => handleEdit(task.id)}>
                    {isEditing && isEditing === task.id ? <More /> : <Edit />}
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
