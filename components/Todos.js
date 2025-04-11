import { View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import storageService from '../services/storage';
import { useSelector } from 'react-redux';

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

    return (
        <View style={styles.card}>
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
});