import { View, Text, StyleSheet } from 'react-native';

export default function Addtodo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is where you add a new todo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
