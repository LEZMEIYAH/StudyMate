import React from "react"; 
import { ScrollView } from "react-native"; 
import TaskItem from "./TaskItem"; 
import styles from "../../config/TaskStyles"; 

const TaskList = ({ tasks, handleEditTask, handleToggleCompletion, handleDeleteTask }) => { 
    return ( 
        <ScrollView style={styles.taskList}> 
            {tasks.map((t) => ( 
                <TaskItem 
                    key={t.id} 
                    task={t} 
                    handleEditTask={handleEditTask} 
                    handleToggleCompletion={handleToggleCompletion} 
                    handleDeleteTask={handleDeleteTask} 
                /> 
            ))} 
        </ScrollView> 
    ); 
}; 

// Export the TaskList component 
export default TaskList;