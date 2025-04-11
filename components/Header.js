import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Header() {
    const navigation = useNavigation();
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>To Do List</Text>
            <Text style={styles.username}>User: {currentUser}</Text>
          </View>
          <TouchableOpacity onPress={() => { return navigation.navigate('Addtodo') }}>
              <Ionicons name="add-circle-outline" size={32} color="#007bff" />
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    marginRight: 10,
    fontSize: 16,
    color: '#555',
  },
});
