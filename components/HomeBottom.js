import { Text, View, StyleSheet, ScrollView } from 'react-native';
import iconData from "../config/iconData.json"
import { FontAwesome6 } from '@expo/vector-icons';

export default function HomeBottom({ data }) {

    const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.date.seconds * 1000);
        const dateB = new Date(b.date.seconds * 1000);
        return dateB - dateA; // Sort in descending order
    });

    return (
       <ScrollView>
           {sortedData.map((expense, index) => (
               <View key={index}>
                    <Card 
                        typeName={expense.typeName} 
                        amount={expense.amount} 
                        date={new Date(expense.date.seconds * 1000).toLocaleDateString()} />
               </View>
           ))}
       </ScrollView>
    );
}

function Card({ typeName, amount, date }){
    const icon = iconData;
    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <FontAwesome6 name={icon[typeName].icon} size={24} color="#4f4f4f" />
                <View style={styles.nameAndDate}>
                    <Text>{typeName}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>
            <Text style={styles.amount}>-{amount}$</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bigContainer: {
        overflowY: "scroll"
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "space-between",
        width: "100%",
    },
    wrap: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1, 
    },
    nameAndDate: {
        marginLeft: 10,
    },
    date: {
        color: "#575757",
        fontSize: 15,
    },
    amount: {
        color: "red",
    }
});