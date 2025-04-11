import { FlatList,Text, TouchableOpacity, View, StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import Todos from './Todos';
import Header from './Header';
import { useSelector } from 'react-redux';
import storageService from '../services/storage';
import { Swipeable } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function Homescreen() {
    const currentUser = useSelector((state)=>state.user.currentUser)
    const [todos,setTodos] = useState([]);
    
    const fetchTodos = async()=>{
        const storedTodos =await storageService.getTodos(currentUser);
        setTodos(storedTodos || [])
    }

    useEffect(()=>{
        fetchTodos();
    },[currentUser])
    
    const [statusFilter, setStatusFilter] = useState('All');

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.filterContainer}>
            {['All', 'Pending', 'Completed'].map((status) => (
                <TouchableOpacity
                key={status}
                onPress={() => setStatusFilter(status)}
                style={[
                    styles.filterButton,
                    statusFilter === status && styles.activeFilterButton,
                ]}
                >
                <Text
                    style={[
                    styles.filterText,
                    statusFilter === status && styles.activeFilterText,
                    ]}
                >
                    {status}
                </Text>
                </TouchableOpacity>
            ))}
            </View>
            <Text style={styles.swipeHint}>Swipe Left to Delete</Text>

            <FlatList
            contentContainerStyle={styles.scrollContainer}
            data={todos.filter((todo) => {
                if (statusFilter === 'All') return true;
                if (statusFilter === 'Completed') return todo.finished === 1;
                if (statusFilter === 'Pending') return todo.finished === 0;
            })}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <Swipeable
                renderRightActions={() => (
                    <TouchableOpacity
                    style={styles.swipeDeleteButton}
                    onPress={async () => {
                        const updatedTodos = todos.filter((t) => t.id !== item.id);
                        await storageService.updateTodos(updatedTodos, currentUser);
                        setTodos(updatedTodos);
                    }}
                    >
                    <Text style={styles.swipeDeleteText}>Delete</Text>
                    </TouchableOpacity>
                )}
                >
                    <Todos todo={item} onUpdate={fetchTodos} />
                </Swipeable>
  )}
/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    scrollContainer: {
        padding: 16,
        width: width,
        alignSelf: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
        marginTop: 10,
        paddingHorizontal: 10,
      },
      
      filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
      },
      
      activeFilterButton: {
        backgroundColor: '#4CAF50',
      },
      
      filterText: {
        fontWeight: 'bold',
        color: '#333',
      },
      
      activeFilterText: {
        color: '#fff',
      },      
      swipeDeleteButton: {
        backgroundColor: '#FF5252',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        marginVertical: 8,
        borderRadius: 10,
      },
      
      swipeDeleteText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
      },
      swipeHint: {
        textAlign: 'center',
        color: '#666',
        fontSize: 14,
        marginBottom: 10,
      },
      
});