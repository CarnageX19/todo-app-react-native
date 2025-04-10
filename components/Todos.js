import { View, StyleSheet, Text } from 'react-native';

export default function Todos() {
    return (
        <View style={styles.card}>
            <Text style={styles.text}> Have to finish some stuff </Text>
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
        fontSize: 16,
    },
});