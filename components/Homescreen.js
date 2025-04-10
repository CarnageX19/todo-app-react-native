import {View, StyleSheet, Text} from 'react-native'
import Todos from './Todos';

export default function Homescreen()
{
    return(
        <View style={styles.container}>
            <Todos/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }
});