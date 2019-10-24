import React from 'react';
import { useSelector } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Meetups from './pages/Meetups';
import HeaderBar from './components/HeaderBar';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabBotton() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          borderTopColor: '#fff0',
          backgroundColor: '#2B1A2F',
        },
      }}
    >
      <Tab.Screen name="Meetups" component={Meetups} />
      <Tab.Screen name="Inscrições" component={Subscriptions} />
      <Tab.Screen name="Meu Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

function Screens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ header: HeaderBar }}
        name="test"
        component={TabBotton}
      />
    </Stack.Navigator>
  );
}

function AuthRoutes() {
  return (
    <Tab.Navigator tabBarOptions={{ style: { display: 'none' } }}>
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="SignUp" component={SignUp} />
    </Tab.Navigator>
  );
}

export default function App() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationNativeContainer>
      {signed ? <Screens /> : <AuthRoutes />}
    </NavigationNativeContainer>
  );
}

// const AuthRoutes = createSwitchNavigator(
//     {
//       SignIn,
//       SignUp
//     },
//     {
//       initialRouteName: 'SignIn',
//     }
//   )
// export default (isSigned = false) =>
//   createAppContainer(
//     createSwitchNavigator(
//       {
//         Sign: createSwitchNavigator({
//           SignIn,
//           SignUp,
//         }),
//         Screen: createStackNavigator(
//           {
//             App: TabBottom,
//           },
//           {
//             defaultNavigationOptions: {
//               headerTintColor: '#fff',
//               headerTitle: <HeaderBar />,
//             },
//           }
//         ),
//       },
//       {
//         initialRouteName: isSigned ? 'Screen' : 'Sign',
//       }
//     )
//   );

// createBottomTabNavigator(
//   {
//     Meetups,
//     Subscriptions,
//     Profile,
//   },
//   {
//     resetOnBlur: true,
//     tabBarOptions: {
//       keyboardHidesTabBar: true,
//       activeTintColor: '#FFF',
//       inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
//       style: {
//         borderTopColor: '#fff0',
//         backgroundColor: '#2B1A2F',
//       },
//     },
//   }
// ),
