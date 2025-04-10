import {View, StyleSheet, Text} from 'react-native'

export default function Homescreen()
{
    return(
        <View style={styles.container}>
            <Text>
                This is the Homescreen
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }
});