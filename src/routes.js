import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Meetups from './pages/Meetups';
import HeaderBar from './components/HeaderBar';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        Screen: createStackNavigator(
          {
            App: createBottomTabNavigator(
              {
                Meetups,
                Subscriptions,
                Profile,
              },
              {
                resetOnBlur: true,
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#FFF',
                  inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                  style: {
                    borderTopColor: '#fff0',
                    backgroundColor: '#2B1A2F',
                  },
                },
              }
            ),
          },
          {
            defaultNavigationOptions: {
              headerTintColor: '#fff',
              headerTitle: <HeaderBar />,
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'Screen' : 'Sign',
      }
    )
  );
