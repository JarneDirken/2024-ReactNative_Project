import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../views/Home';
import Analytics from '../views/Analytics';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Platform, TouchableOpacity, Modal, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import iconData from "../config/iconData.json";
import { POST_EXPENSES, GET_EXPENSES } from '../api/queries';
import { useRecoilState } from 'recoil';
import { fetchDataState } from '../store';

const AddExpenseModal = ({ visible, onClose }) => {
  const [refreshTrigger, setRefreshTrigger] = useRecoilState(fetchDataState); 
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('food');

  const handleAddExpense = async () => {
      if (amount && type) {
          await POST_EXPENSES(amount, type);
          console.log('Expense added:', { amount, type });
          setRefreshTrigger(true);
          onClose(); // Close the modal after adding the expense
      }
  };

  return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.amountContainer}>
              <TextInput
                    style={styles.amount}
                    onChangeText={setAmount}
                    value={amount}
                    keyboardType="numeric"
                    placeholder='0'
                />
            </View>
            <View>
              <Picker
                selectedValue={type}
                onValueChange={(itemValue, itemIndex) => setType(Object.keys(iconData)[itemIndex])}
                style={styles.picker}
              >
                {Object.keys(iconData).map((key) => (
                  <Picker.Item key={key} label={key} value={key} />
                ))}
              </Picker>
            </View>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={onClose} style={styles.cancel}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddExpense} style={styles.add}>
                    <Text>Add</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>
  );
};

export default function Navigation(){
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useRecoilState(fetchDataState); 

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
    setRefreshTrigger(false);
}, [refreshTrigger]);


    const Tab = createBottomTabNavigator();
    const isWeb = Platform.OS === 'web';

    return (
      <NavigationContainer>
      <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === "Home") {
                      iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === "Analytics") {
                      iconName = focused ? 'analytics-sharp' : 'analytics-outline';
                  } else if (route.name === "Plus") {
                      return <TouchableOpacity style={styles.plusButton} onPress={() => setModalVisible(true)}>
                          <Ionicons name="add-circle" size={48} color="dodgerblue" />
                      </TouchableOpacity>;
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'dodgerblue',
              tabBarInactiveTintColor: 'gray',
              tabBarLabelStyle: { paddingBottom: isWeb ? 0 : 0 },
              tabBarStyle: [{ display: 'flex' }, { height: isWeb ? 60 : 80 }],
              tabBarShowLabel: false,
          })}
      >
          <Tab.Screen name="Home">
              {() => <Home expenses={filteredExpenses} />}
          </Tab.Screen>
          <Tab.Screen 
              name="Plus" 
              component={() => <Home />}
              listeners={{
                  tabPress: (e) => {
                      e.preventDefault();
                      setModalVisible(true);
                  },
              }}
              options={{
                  tabBarIcon: () => (
                      <Ionicons name="add-circle" size={48} color="dodgerblue" />
                  )
              }}
          />
          <Tab.Screen name="Analytics">
              {() => <Analytics expenses={filteredExpenses} />}
          </Tab.Screen>
      </Tab.Navigator>
      <AddExpenseModal visible={modalVisible} onClose={() => setModalVisible(false)} />
  </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    plusButton: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      width: Platform.OS === 'web' ? 375 : '100%', 
      height: Platform.OS === 'web' ? 667 : '100%', 
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: "auto",
  },
    modal: {
      display: "flex",
      justifyContent: 'center',
      alignItems: Platform.OS === 'web' ? "center" : 'stretch', 
      marginTop: "auto",
      marginBottom: "auto",
      width: Platform.OS === 'web' ? 375 : '80%', 
      height: Platform.OS === 'web' ? 667 : 'auto', 
      borderWidth: Platform.OS === 'web' ? 2 : 0,
      borderRadius: Platform.OS === 'web' ? 20 : 0,
      shadowColor: Platform.OS === 'web' ? "#000" : 'transparent', 
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'web' ? 2 : 0,
    },
    maxWidth: 375,
    shadowOpacity: Platform.OS === 'web' ? 0.25 : 0,
    shadowRadius: Platform.OS === 'web' ? 3.84 : 0,
    elevation: Platform.OS === 'web' ? 5 : 0,
      padding: 20,
      overflow: "hidden",
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      justifyContent: "center",
      marginTop: Platform.OS === 'web' ? 20 : 6,
    },
    cancel: {
      padding: 13,
      paddingHorizontal: 18,
      backgroundColor: "#4287f5",
      borderRadius: 10,
    },
    add: {
      padding: 13,
      paddingHorizontal: 18,
      backgroundColor: "#b0f542",
      borderRadius: 10,
    },
    amountContainer: {
      justifyContent: "center",
      alignItems:"center",
      marginBottom: Platform.OS === 'web' ? 20 : 0,
    },
    amount: {
      justifyContent: "center",
      alignItems:"center",
      flexGrow: 1,
      maxWidth: '100%',
      width: "50%",
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
      fontSize: 50,
      textAlign: 'center',
      ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}), 
    }
  });