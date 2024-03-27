import { View } from 'react-native';
import HomeTop from '../components/HomeTop';
import HomeBottom from '../components/HomeBottom';

export default function Home({expenses}){

    return(
        <View>
            <HomeTop data={expenses}/>
            <HomeBottom data={expenses}/>
        </View>
    );
}