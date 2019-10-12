import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default createAppContainer(
  createBottomTabNavigator({
    SignIn,
    SignUp,
  })
);
