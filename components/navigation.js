import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../views/Home';
import Analytics from '../views/Analytics';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Platform, TouchableOpacity, Modal, Text, TextInput } from 'react-native';
import { useState } from 'react';

const AddExpenseModal = ({ visible, onClose }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExpense = async () => {
      if (amount && description) {
          // Call your API function to add an expense
          // await ADD_EXPENSE({ amount, description });
          console.log('Expense added:', { amount, description });
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
          <View style={{ marginTop: 50, backgroundColor: 'white', padding: 20 }}>
              <Text>Amount:</Text>
              <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={setAmount}
                  value={amount}
                  keyboardType="numeric"
              />
              <Text>Description:</Text>
              <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={setDescription}
                  value={description}
              />
              <TouchableOpacity onPress={handleAddExpense}>
                  <Text>Add Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                  <Text>Cancel</Text>
              </TouchableOpacity>
          </View>
      </Modal>
  );
};

export default function Navigation(){
  const [modalVisible, setModalVisible] = useState(false);
    const Tab = createBottomTabNavigator();
    const isWeb = Platform.OS === 'web';

    const PlusButton = () => (
      <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setModalVisible(true)}
      >
          <Ionicons name="add-circle" size={48} color="dodgerblue" />
      </TouchableOpacity>
  );

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
                return (
                  <TouchableOpacity style={styles.plusButton}>
                    <Ionicons name="add-circle" size={48} color="dodgerblue" />
                  </TouchableOpacity>
                );
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'dodgerblue',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { paddingBottom: isWeb ? 0 : 0 },
            tabBarStyle: { height: isWeb ? 60 : 80, justifyContent: "" },
            tabBarShowLabel: false, 
            tabBarStyle: { display: 'flex' }, 
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen 
                    name="Plus" 
                    component={() => null} // This screen doesn't have a component
                    options={{
                        tabBarButton: () => <PlusButton />
                    }}
                />
          <Tab.Screen name="Analytics" component={Analytics} />
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
  });