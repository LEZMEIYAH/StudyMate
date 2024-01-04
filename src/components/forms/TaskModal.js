import React, { useState } from "react"; 
import { View, Text, TextInput, Button, Modal, ScrollView, TouchableOpacity} from "react-native"; 
import styles from "../../config/TaskStyles"; 
import DatePicker from "react-native-modern-datepicker"; 
import ModalSelector from 'react-native-modal-selector';

const TaskModal = ({ modalVisible, task, setTask, handleAddTask, handleCancel, validationError, categories, setNewCategory, newCategory, handleAddCategory, handleAddTaskAndCategory}) => { 
    const [selectedCategory, setSelectedCategory] = useState(task.category || ""); // Initialize with the current task category

    const handleCategoryChange = (option) => {
        setSelectedCategory(option.value);
        setTask({ ...task, category: option.value });
    };

    return ( 
        <Modal visible={modalVisible} animationType="slide" transparent={false}> 
        
        {/* Container for the modal */} 
        <View style={styles.modalContainer}> 
            <ScrollView>
                <TextInput 
                    style={styles.input} 
                    placeholder="Title"
                    value={task.title} 
                    onChangeText={(text) => setTask({ ...task, title: text })} 
                    // Update the title when text changes
                    /> 

                <TextInput 
                    style={styles.input} 
                    placeholder="Description"
                    value={task.description} 
                    onChangeText={(text) => setTask({ ...task, description: text })}
                /> 

                <Text style={styles.inputLabel}>Category:</Text>
                <ModalSelector
                    data={categories.map((category, index) => ({
                    key: index,
                    label: category,
                    value: category,
                    }))}
                    initValue="Select Category"
                    onChange={(option) => setTask({ ...task, category: option.value })}
                />

                <View style={styles.newCategoryContainer}>
                    <TextInput
                    style={styles.newCategoryInput}
                    placeholder="New Category"
                    value={newCategory}
                    onChangeText={(text) => setNewCategory(text)}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                    <Text style={styles.addButtonText}>Add Category</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputLabel}> Deadline: </Text> 
                <DatePicker 
                    style={styles.datePicker} 
                    mode="datepicker"
                    selected={task.deadline} 
                    onDateChange={(date) => setTask({ ...task, deadline: date }) }
                /> 

                {validationError && ( 
                    <Text style={styles.errorText}> Please fill in all fields correctly. </Text> 
                )}
                
                <Button 
                    title={task.id ? "Update" : "Add"} 
                    onPress={handleAddTaskAndCategory} 
                    color="#007BFF"
                /> 

                <Button 
                    title="Cancel"
                    onPress={handleCancel} 
                    color="#FF3B30"
                /> 
            </ScrollView>
        </View> 
        </Modal> 
    ); 
}; 

export default TaskModal;
