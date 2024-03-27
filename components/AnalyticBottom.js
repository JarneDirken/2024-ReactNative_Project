import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import iconData from "../config/iconData.json"

export default function AnalyticBottom({ data }){
    return(
        <View style={{marginTop: 30}}>
            <HighestSpent data={data}/>
            <MostEntry data={data} />
            <Text style={{marginTop: 10, marginLeft: 10}}>History:</Text>
            <History data={data}/>
        </View>
    );
}

function MostEntry({ data }) {
    let typeCount = {};
    let typeAmounts = {};

    data.forEach(item => {
        typeCount[item.typeName] = (typeCount[item.typeName] || 0) + 1;
        typeAmounts[item.typeName] = (typeAmounts[item.typeName] || 0) + parseFloat(item.amount);
    });

    let mostEntry = Object.keys(typeCount).reduce((a, b) => typeCount[a] > typeCount[b] ? a : b, '');
    let totalAmount = typeAmounts[mostEntry] || 0;

    return(
        <View style={styles.container}>
            <View style={styles.wrap}>
                <FontAwesome6 name="receipt" size={24} color="#4f4f4f" />
                <View style={styles.nameAndDate}>
                    <Text style={{fontSize: 15, fontWeight: 500}}>Most Entry</Text>
                    <Text style={styles.date}>{typeCount[mostEntry]}x - {mostEntry}</Text>
                </View>
            </View>
            <Text style={styles.amount}>-{totalAmount.toFixed(2)}$</Text>
        </View>
    );
}

function HighestSpent({ data }) {
    // Sort data by amount in descending order, then by date in descending order
    const sortedData = [...data].sort((a, b) => {
        const amountDiff = b.amount - a.amount;
        if (amountDiff !== 0) return amountDiff;

        const dateA = a.date.toDate();
        const dateB = b.date.toDate();
        return dateB - dateA; // most recent first
    });

    const highestSpendEntry = sortedData[0];
    const highestSpendDate = highestSpendEntry.date.toDate();
    const formattedDate = `${highestSpendDate.getDate()}/${highestSpendDate.getMonth() + 1}/${highestSpendDate.getFullYear()}`;

    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <FontAwesome6 name="arrow-trend-up" size={24} color="#4f4f4f" />
                <View style={styles.nameAndDate}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>Highest Spent</Text>
                    <Text style={styles.date}>{formattedDate} - {highestSpendEntry.typeName}</Text>
                </View>
            </View>
            <Text style={styles.amount}>-${highestSpendEntry.amount.toFixed(2)}</Text>
        </View>
    );
}

function History({ data }){
    let typeCounts = {};
    let typeAmounts = {};

    data.forEach(item => {
        typeCounts[item.typeName] = (typeCounts[item.typeName] || 0) + 1;
        typeAmounts[item.typeName] = (typeAmounts[item.typeName] || 0) + parseFloat(item.amount);
    });

    const aggregatedData = Object.keys(typeCounts).map(typeName => ({
        typeName,
        count: typeCounts[typeName],
        amount: typeAmounts[typeName]
    }));

    return (
        <ScrollView>
           {aggregatedData.map((item, index) => (
                <Card
                    key={index}
                    typeName={item.typeName}
                    amount={item.amount}
                    entry={item.count}
                />
            ))}
       </ScrollView>
    );
}

function Card({ typeName, amount, entry }) {
    const icon = iconData;
    const formattedAmount = parseFloat(amount.toFixed(2));
    return (
        <View style={styles.container}>
            <View style={styles.wrap}>
                <FontAwesome6 name={icon[typeName].icon} size={24} color="#4f4f4f" />
                <View style={styles.nameAndDate}>
                    <Text>{typeName}</Text>
                    <Text style={styles.date}>{entry} entries</Text>
                </View>
            </View>
            <Text style={styles.amount}>-{formattedAmount}$</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
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