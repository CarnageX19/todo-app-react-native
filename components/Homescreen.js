import { StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import Todos from './Todos';
import Header from './Header';
import { useSelector } from 'react-redux';
import storageService from '../services/storage';

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
    
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {todos.map((todo,index)=>{
                    return <Todos todo={todo} key={todo.id} onUpdate={fetchTodos}/>
                })}
            </ScrollView>
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
});