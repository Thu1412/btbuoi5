// MyDrawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Profile from './Profile';
import Setting from './Setting';
import Details from './Details';
import Hometodo from '../Todo/Hometodo';
import Dangnhap from './Dangnhap';
import CustomDrawerBar from './CustomDrawerBar';
import CustomNavigationBar from './CustomNavigationBar';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerBar {...props} />}
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Setting" component={Setting} />
      <Drawer.Screen name="Details" component={Details} />
      <Drawer.Screen name="Hometodo" component={Hometodo} />
      <Drawer.Screen name="Dangnhap" component={Dangnhap} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
