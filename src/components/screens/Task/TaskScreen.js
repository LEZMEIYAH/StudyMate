import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
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
    category: "",
    newCategory: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [validationError, setValidationError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // Added filteredTasks state
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddTask = () => { 
    if ( 
      task.title.trim() !== "" &&
      task.deadline !== "" &&
      (task.category.trim() !== "" || task.newCategory.trim() !== "")  // Ensure category is not empty
    ) { 
      const currentDate = new Date(); 
      const formattedDate = currentDate.toLocaleString(); 

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
        category: "",
        newCategory: "",
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

    // Ensure that date and time values are preserved without modification
    setTask((prevTask) => {
      // Copy over all properties from the existing task
      const updatedTask = { ...prevTask };

      // Copy over properties from the task being edited
      for (const key in task) {
        if (task.hasOwnProperty(key)) {
          updatedTask[key] = task[key];
        }
      }

      return updatedTask;

    });  

    setEditingTask(task);
    // Open the modal for editing 
    setModalVisible(true);  
  }; 

  // Function to delete a task 
  const handleDeleteTask = (taskId) => { 
    const updatedTasks = tasks.filter((t) => t.id !== taskId); 
    setTasks(updatedTasks); 
  }; 

  // Function to toggle task completion status 
  const handleToggleCompletion = (taskId) => { 
    const updatedTasks = tasks.map((t) => 
      t.id === taskId 
        ? { 
            ...t, 
            status: 
              t.status === "Pending" ? "Completed" : "Pending", 
          } 
        : t 
    ); 
    setTasks(updatedTasks); 
  };

  // Function to handle category filtering
  const handleFilterByCategory = (selectedCategory) => {
    if (selectedCategory === "All") {
      // Display all tasks when "All" category is selected
      setFilteredTasks(tasks);
    } else {
      // Filter tasks based on the selected category
      const filteredTasks = tasks.filter(
        (t) => t.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredTasks(filteredTasks);
    }
    setSelectedCategory(selectedCategory);
  };

  // Display categories at the top
  const renderCategories = () => {
    return (
      <ScrollView horizontal style={styles.categoryList}
      >
        {/* Add "All" category to display all tasks */}
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedCategory === "All" && styles.selectedCategory,
          ]}
          onPress={() => handleFilterByCategory("All")}
        >
          <Text style={styles.categoryText}>All</Text>
        </TouchableOpacity>

        {/* Display other categories */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => handleFilterByCategory(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}

        {/* Use react-native-picker-select for selecting or adding a category */}
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => handleCategoryChange(value)}
            items={categories.map((category) => ({
              label: category,
              value: category,
            }))}
          />
        </View>

      </ScrollView>
    );
  };
  // Render the JSX for the component 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      {/* Render categories at the top */}
      {renderCategories()}

      {/* Render the TaskList component with filtered tasks */} 
      <TaskList
        tasks={filteredTasks}
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
            category: "",
            newCategory: "",
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
            category: "",
            newCategory: "",
          });
          setModalVisible(false);
          setValidationError(false);
        }}
        validationError={validationError}
        categories={categories}
        setCategories={setCategories}
      />
    </View>
  );
};

// Export the App component as the default export 
export default TaskScreen;
