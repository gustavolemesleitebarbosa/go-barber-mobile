import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment';
import Dashboard from '../pages/Dashboard';
import ApponintmentCreated from '../pages/AppointmentCreated';

const App = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="AppointmentCreated" component={ApponintmentCreated} />

    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);
export default AuthRoutes;
