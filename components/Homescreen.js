import { StyleSheet, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions } from 'react-native';
import Todos from './Todos';
import Header from './Header';

const { width } = Dimensions.get('window');

export default function Homescreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Todos />
                <Todos />
                <Todos />
                <Todos />
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