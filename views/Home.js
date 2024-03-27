import { View, ActivityIndicator } from 'react-native';
import HomeTop from '../components/HomeTop';
import HomeBottom from '../components/HomeBottom';
import React, { useState, useEffect } from 'react';

export default function Home({expenses}){
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (expenses && expenses.length) {
            setLoading(false);
        }
    }, [expenses]);

    return(
        <View>
             {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <View>
                    <HomeTop data={expenses}/>
                    <HomeBottom data={expenses}/>
                </View>
            )}
        </View>
    );
}