import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import TaskList from "../../forms/TaskList";
import TaskModal from "../../forms/TaskModel";
import styles from "../../../config/styles";

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    deadline: "",
    createdAt: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [validationError, setValidationError] = useState(false);

  const handleAddTask = () => { 
    if ( 
      task.title.trim() !== "" && 
      task.deadline !== ""
    ) { 
      const currentDate = new Date(); 
      const formattedDate = 
        currentDate.toLocaleString(); 

      if (editingTask) { 
          
            // If editing an existing task, update it 
        const updatedTasks = tasks.map((t) => 
          t.id === editingTask.id 
            ? { ...t, ...task } 
            : t 
        ); 
        setTasks(updatedTasks); 
        setEditingTask(null); 
      } else { 
          
        // If adding a new task, create it 
        const newTask = { 
          id: Date.now(), 
          ...task, 
                  
          // Set the creation date and time as a string 
          createdAt: formattedDate,  
        }; 
        setTasks([...tasks, newTask]); 
      } 

      // Clear the task input fields and reset state 
      setTask({ 
        title: "", 
        description: "", 
        status: "Pending", 
        deadline: "", 
        createdAt: "", 
      }); 
          
      // Close the modal 
      setModalVisible(false); 
          
      // Reset validation error 
      setValidationError(false);  
    } else { 
      
      // Show validation error if fields are not filled 
      setValidationError(true);  
    } 
  }; 

  // Function to handle task editing 
  const handleEditTask = (task) => { 
  
    // Set the task being edited 
    setEditingTask(task);  
      
    // Pre-fill the input with task data 
    setTask(task);  
      
    // Open the modal for editing 
    setModalVisible(true);  
  }; 

  // Function to delete a task 
  const handleDeleteTask = (taskId) => { 
    const updatedTasks = tasks.filter( 
      (t) => t.id !== taskId 
    ); 
    setTasks(updatedTasks); 
  }; 

  // Function to toggle task completion status 
  const handleToggleCompletion = (taskId) => { 
    const updatedTasks = tasks.map((t) => 
      t.id === taskId 
        ? { 
            ...t, 
            status: 
              t.status === "Pending"
                ? "Completed"
                : "Pending", 
          } 
        : t 
    ); 
    setTasks(updatedTasks); 
  };

  // Return the JSX for rendering the component 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      {/* Render the TaskList component */} 
      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleToggleCompletion={handleToggleCompletion}
        handleDeleteTask={handleDeleteTask}
      />
      {/* Button to add or edit tasks */} 
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingTask(null);
          setTask({
            title: "",
            description: "",
            status: "Pending",
            deadline: "",
            createdAt: "",
          });
          setModalVisible(true);
          setValidationError(false);
        }}
      >
        <Text style={styles.addButtonText}>
          {editingTask ? "Edit Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
      {/* Render the TaskModal component */} 
      <TaskModal
        modalVisible={modalVisible}
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
        handleCancel={() => {
          setEditingTask(null);
          setTask({
            title: "",
            description: "",
            status: "Pending",
            deadline: "",
            createdAt: "",
          });
          setModalVisible(false);
          setValidationError(false);
        }}
        validationError={validationError}
      />
    </View>
  );
};

// Export the App component as the default export 
export default TaskScreen;
