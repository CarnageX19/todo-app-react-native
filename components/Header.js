import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
        <Text style={styles.title}>To Do List</Text>
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
});
