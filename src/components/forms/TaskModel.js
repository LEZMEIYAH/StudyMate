import React from "react"; 
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    Modal, 
} from "react-native"; 
import styles from "../../config/styles"; 
import DatePicker from "react-native-modern-datepicker"; 

const TaskModal = ({ 
    modalVisible, 
    task, 
    setTask, 
    handleAddTask, 
    handleCancel, 
    validationError, 
    categories,  
    setCategories,  
}) => { 
    const handleCategoryChange = (selectedCategory) => {
        setTask({ ...task, category: selectedCategory });
    };

    return ( 
        <Modal 
            visible={modalVisible} 
            animationType="slide"
            transparent={false}> 

            {/* Container for the modal */} 
            <View style={styles.modalContainer}> 
                <TextInput 
                    style={styles.input} 
                    placeholder="Title"
                    value={task.title} 
                    onChangeText={(text) => setTask({ ...task, title: text }) 
                    } 
                    // Update the title when text changes
                    /> 

                <TextInput 
                    style={styles.input} 
                    placeholder="Description"
                    value={task.description} 
                    onChangeText={(text) => 
                        setTask({ 
                            ...task, 
                            description: text, 
                        }) 
                    }
                /> 

                <TextInput 
                    style={styles.input} 
                    placeholder="Category"
                    value={task.category} 
                    onChangeText={(text) => setTask({ ...task, category: text }) 
                    } 
                />

                {/* Dropdown for existing categories */}
                <Picker
                    selectedValue={task.category}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) =>
                        handleCategoryChange(itemValue)
                    }
                >
                <Picker.Item label="Select Category" value="" />
                    {categories.map((category) => (
                        <Picker.Item key={category} label={category} value={category} />
                    ))}
                </Picker>

                {/* Input field for adding a new category */}
                <TextInput
                    style={styles.input}
                    placeholder="New Category"
                    value={task.newCategory}
                    onChangeText={(text) => setTask({ ...task, newCategory: text })}
                />

                <Text style={styles.inputLabel}> Deadline: </Text> 
                <DatePicker 
                    style={styles.datePicker} 
                    mode="datepicker"
                    selected={task.deadline} 
                    onDateChange={(date) => 
                        setTask({ ...task, deadline: date }) 
                    }/> 

                {validationError && ( 
                    <Text style={styles.errorText}> 
                        Please fill in all fields correctly. 
                    </Text> 
                )} 
                <Button 
                    title={task.id ? "Update" : "Add"} 
                    onPress={handleAddTask} 
                    color="#007BFF"/> 

                <Button 
                    title="Cancel" 
                    onPress={handleCancel} 
                    color="#FF3B30"/> 
            </View> 
        </Modal> 
    ); 
}; 

export default TaskModal;