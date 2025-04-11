import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ToastAndroid, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import storageService from '../services/storage';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';

export default function Addtodo() {
  const navigation = useNavigation();
  const currentUser = useSelector((state)=>state.user.currentUser)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [dateAdded, setDateAdded] = useState(new Date());

  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [showDateAddedPicker, setShowDateAddedPicker] = useState(false);

  const [titleError, setTitleError] = useState('');

  const handleSave = async() => {
    if (title.trim() === '') {
      setTitleError('Title is required');
      return;
    }   
    const todo = {
        title,
        desc: description,
        deadline,
        dateAdded,
        id:uuid.v4(),
        user:currentUser,
        finished:0
    };

      try {
        await storageService.addTodo(todo,currentUser);
      } catch (error) {
          console.error(`Unable to store todo: ${error}`)
      }

      if (Platform.OS === 'android') {
        ToastAndroid.show('Todo saved!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Todo saved!');
      }

      navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSave()}>
          <Ionicons name="checkmark" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => {
        setTitle(text);
        if (text.trim().length > 0) setTitleError('');
  }}
      />
      {titleError ? <Text style={styles.error}>{titleError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity onPress={() => setShowDeadlinePicker(true)} style={styles.dateBtn}>
        <Text style={styles.dateText}>Deadline: {deadline.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowDateAddedPicker(true)} style={styles.dateBtn}>
        <Text style={styles.dateText}>Date Added: {dateAdded.toDateString()}</Text>
      </TouchableOpacity>

      {showDeadlinePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDeadlinePicker(false);
            if (selectedDate) setDeadline(selectedDate);
          }}
        />
      )}

      {showDateAddedPicker && (
        <DateTimePicker
          value={dateAdded}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDateAddedPicker(false);
            if (selectedDate) setDateAdded(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  dateBtn: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
  },
});
