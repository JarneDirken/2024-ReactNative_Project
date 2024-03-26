import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import HomeTop from '../components/HomeTop';
import HomeBottom from '../components/HomeBottom';
import { GET_TYPES, GET_EXPENSES } from '../api/queries';

export default function Home(){
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const allExpenses = await GET_EXPENSES();
            
            // Filter expenses for the current month
            const currentDate = new Date();
            const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            
            const filteredData = allExpenses.filter(expense => {
                const expenseDate = expense.date.toDate(); // Convert Firestore timestamp to JavaScript Date object
                return expenseDate >= currentMonthStart && expenseDate <= currentMonthEnd;
            });

            setFilteredExpenses(filteredData);
        }

        fetchData();
    }, []);

    return(
        <View>
            <HomeTop data={filteredExpenses}/>
            <HomeBottom data={filteredExpenses}/>
        </View>
    );
}