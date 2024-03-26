import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function HomeTop({ data }) {
    const totalAmount = data.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
    const [integerPart, decimalPart] = totalAmount.split('.');

    return (
       <View style={styles.container}>
            <Text style={styles.text}>Spend this month:</Text>
            <View style={styles.amountContainer}>
                <Text style={styles.dollar}>$-</Text>
                <Text style={styles.integer}>{integerPart}</Text>
                <Text style={styles.decimal}>{`.${decimalPart}`}</Text>
            </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        minHeight: 350
    },
    text: {
        fontSize: 15
    },  
    amountContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    integer: {
        color: "red",
        fontWeight: "bold",
        fontSize: 40
    },
    decimal: {
        color: "red",
        fontSize: 20,
        marginTop: 7
    },
    dollar: {
        color: "red",
        fontWeight: "bold",
        marginTop: 3,
        fontSize: 24,
    }
});
