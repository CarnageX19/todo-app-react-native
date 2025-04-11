import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../globalstate/userslice';

export default function Header() {
    const navigation = useNavigation();
    const currentUser = useSelector((state) => state.user.currentUser);

    const dispatch = useDispatch();

    const handleLogout = () => {
      dispatch(setCurrentUser(""));
      navigation.navigate('Login');
    };


    return (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>To Do List</Text>
            <Text style={styles.username}>User: {currentUser}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => navigation.navigate('Addtodo')}>
              <Ionicons name="add-circle-outline" size={32} color="#007bff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  
  logoutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
});
