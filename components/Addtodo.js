import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function Addtodo() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [dateAdded, setDateAdded] = useState(new Date());

  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const [showDateAddedPicker, setShowDateAddedPicker] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* does nothing now */ }}>
          <Ionicons name="checkmark" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

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
