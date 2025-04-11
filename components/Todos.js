import { View, StyleSheet, Text,TouchableOpacity, Modal, TextInput } from 'react-native';
import storageService from '../services/storage';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Todos({todo, onUpdate}) {
    const currentUser = useSelector((state) => state.user.currentUser);
    const markAsFinished = async()=>{
        const  updatedTodo = {...todo, finished:1}
        try{
            const todos = await storageService.getTodos(currentUser);
            const updatedTodoList = todos.map((td)=>(td.id === todo.id ? updatedTodo : td))
            await storageService.updateTodos(updatedTodoList,currentUser)
            onUpdate()//re-renders home page
        }
        catch(error)
        {
            console.error(`Unable to update todo ${error}`)
        }
    }

    const isDeadlinePassed = () => {
        const today = new Date();
        const deadline = new Date(todo.deadline);
      
        return (
          today.getFullYear() > deadline.getFullYear() ||
          (today.getFullYear() === deadline.getFullYear() &&
            today.getMonth() > deadline.getMonth()) ||
          (today.getFullYear() === deadline.getFullYear() &&
            today.getMonth() === deadline.getMonth() &&
            today.getDate() > deadline.getDate())
        );
    };

    //Delete todo stuff
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async () => {
        try {
          const todos = await storageService.getTodos(currentUser);
          const updatedTodos = todos.filter((td) => td.id !== todo.id);
          await storageService.updateTodos(updatedTodos, currentUser);
          onUpdate(); 
          setShowDeleteModal(false);
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
    };
    
    //Update todo logic same as mark as update thing
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDesc, setEditDesc] = useState(todo.desc);
    const [editDeadline, setEditDeadline] = useState(todo.deadline);

    const handleUpdate = async () => {
        try {
          const updatedTodo = {
            ...todo,
            title: editTitle,
            desc: editDesc,
            deadline: editDeadline,
          };
          const todos = await storageService.getTodos(currentUser);
          const updatedTodoList = todos.map((td) => (td.id === todo.id ? updatedTodo : td));
          await storageService.updateTodos(updatedTodoList, currentUser);
          onUpdate();
          setShowEditModal(false);} 
          catch (error) {
          console.error('Error updating todo:', error);
        }
    };
      
    //date time picker for update and delete
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) 
        setSelectedDate(date);
    };


    return (
        <View>
            <Modal
            visible={showDeleteModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowDeleteModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Are you sure you want to delete this todo?</Text>
                    <Text style={styles.modalTodoTitle}>{todo.title}</Text>
                    <Text style={styles.modalTodoDesc}>{todo.desc}</Text>

                    <View style={styles.modalButtonRow}>
                        <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.modalCancel}>
                        <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={styles.modalConfirm}>
                        <Text style={styles.modalConfirmText}>Yes, Delete</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>

            <Modal
            visible={showEditModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowEditModal(false)}
            >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Todo</Text>
                <TextInput
                    style={styles.input}
                    value={editTitle}
                    onChangeText={(text) => setEditTitle(text)}
                    placeholder="Title"
                />
                <TextInput
                    style={styles.input}
                    value={editDesc}
                    onChangeText={(text)=> setEditDesc(text)}
                    placeholder="Description"
                    multiline
                />
                <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.input}
                >
                    <Text style={{ color: '#333' }}>
                        📅 {new Date(editDeadline).toDateString()}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                <DateTimePicker
                    value={new Date(editDeadline)}
                    mode="date"
                    display="calendar"
                    onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) {
                        setEditDeadline(date.toISOString());
                        setSelectedDate(date);
                    }
                    }}
                />
                )}

                    <View style={styles.modalButtonRow}>
                        <TouchableOpacity onPress={() => setShowEditModal(false)} style={styles.modalCancel}>
                        <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleUpdate} style={styles.modalConfirm}>
                        <Text style={styles.modalConfirmText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </Modal>

            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="pencil" size={20} color="#444" onPress={() => setShowEditModal(true)}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setShowDeleteModal(true)}>
                        <Ionicons name="trash" size={20} color="#D32F2F" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>{todo.title} </Text>
                <Text style={styles.desc}>{todo.desc}</Text>
                <Text style={styles.dateAdded}>Date Added: {new Date(todo.dateAdded).toDateString()}</Text>
                {isDeadlinePassed() && todo.finished === 0 ? (
                <Text style={styles.deadlinePassed}>⚠️ Deadline Passed: {new Date(todo.deadline).toDateString()}</Text>
                ) : (
                <Text style={styles.deadline}>Deadline: {new Date(todo.deadline).toDateString()}</Text>
                )}
                
                {todo.finished === 0 && (
                    <TouchableOpacity style={styles.finishButton} onPress={markAsFinished}>
                        <Text style={styles.finishButtonText}>Mark as Finished</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        width: '100%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    desc: {
        fontSize: 14,
        marginBottom: 8,
    },
    dateAdded: {
        fontSize: 12,
        color: '#666',
    },
    deadline: {
        fontSize: 12,
        color: 'green',
    },
    finishButton: {
        marginTop: 12,
        backgroundColor: '#4CAF50', // green
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      },
      
      finishButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
      },
      deadlinePassed: {
        fontSize: 14,
        color: '#D32F2F', // dark red
        fontWeight: 'bold',
      },
      iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        gap: 12,
        zIndex: 999,
      },
      iconButton: {
        padding: 4,
      },      
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
      },
      modalTodoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      modalTodoDesc: {
        fontSize: 14,
        color: '#555',
        marginBottom: 15,
        textAlign: 'center',
      },
      modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      modalCancel: {
        backgroundColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginRight: 10,
      },
      modalConfirm: {
        backgroundColor: '#D32F2F',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
      },
      modalCancelText: {
        color: '#000',
        fontWeight: 'bold',
      },
      modalConfirmText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        fontSize: 14,
      },
});