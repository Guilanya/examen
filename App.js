import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from './TaskListScreen';
import EditTaskScreen from './EditTaskScreen';
import CreateTaskScreen from './CreateTaskScreen';  // Asegúrate de importar la pantalla correctamente

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        {/* Asegúrate de que las pantallas estén dentro de los Screen tags */}
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
