import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BarChart } from "react-native-gifted-charts";

export default function AnalyticTop({ data }) {
    const [chartData, setChartData] = useState([]);
    const totalAmount = data.reduce((total, expense) => total + expense.amount, 0).toFixed(2);

    useEffect(() => {
        const aggregateDataByWeek = (expenses) => {
            let weeklyTotals = [];
            
            // Assuming expenses are for the current month
            const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        
            // Calculate the total number of weeks in the current month
            const totalWeeks = Math.ceil((lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + firstDayOfMonth.getDay()) / 7);
        
            expenses.forEach(expense => {
                const expenseDate = expense.date.toDate();
                const dayOfMonth = expenseDate.getDate();
        
                const startDayOfWeek = firstDayOfMonth.getDay();
                const weekNumber = Math.floor((dayOfMonth + startDayOfWeek - 1) / 7) + 1;
        
                const weekLabel = `Week ${weekNumber}`;
                const existingWeek = weeklyTotals.find(w => w.label === weekLabel);
                
                if (existingWeek) {
                    existingWeek.value += parseFloat(expense.amount);
                } else {
                    weeklyTotals.push({
                        label: weekLabel,
                        value: parseFloat(expense.amount)
                    });
                }
            });
        
            for (let i = 1; i <= totalWeeks; i++) {
                const weekLabel = `Week ${i}`;
                if (!weeklyTotals.find(w => w.label === weekLabel)) {
                    weeklyTotals.push({
                        label: weekLabel,
                        value: 0
                    });
                }
            }
        
            weeklyTotals.sort((a, b) => a.label.localeCompare(b.label));
        
            return weeklyTotals;
        };

        if (data && data.length) {
            const aggregatedData = aggregateDataByWeek(data);
            setChartData(aggregatedData);
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <Text style={styles.amount}>$-{totalAmount}</Text>
            <Text>Total spend this month:</Text>
            <BarChart
                data={chartData}
                barWidth={35}
                yAxisSuffix="$"
                yAxisInterval={1} // Optional: To show all yAxis labels
                noOfSections={5}
                barBorderRadius={4}
                frontColor="#6a90eb"
                xAxisLabelStyle={{
                    color: 'black',
                    fontFamily: 'Cursive',
                    fontSize: 14
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        minHeight: 350,
        marginLeft: 15,
    },
    amount: {
        fontSize: 35,
        color: "red",
        marginBottom: 5,
    }
});
