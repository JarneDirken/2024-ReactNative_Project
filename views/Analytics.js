import { View, ActivityIndicator } from 'react-native';
import AnalyticTop from '../components/AnalyticTop';
import AnalyticBottom from '../components/AnalyticBottom';
import React, { useState, useEffect } from 'react';

export default function Analytics( {expenses} ){
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (expenses && expenses.length) {
            setLoading(false);
        }
    }, [expenses]);

    return(
        <View>
            {loading ? (
                <ActivityIndicator style={{justifyContent: "center", alignItems: "center"}} size="large" />
            ) : (
                <View>
                    <AnalyticTop data={expenses}/>
                    <AnalyticBottom data={expenses} />
                </View>
            )}
        </View>
    );
}