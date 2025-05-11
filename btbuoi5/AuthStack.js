import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import Dangnhap from './Dangnhap';
import Taotaikhoan from './Taotaikhoan';
import Laylaimatkhau from './Laylaimatkhau';
import MyDrawer from './MyDrawer'; 
import Hometodo from '../Todo/Hometodo';
const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dangnhap" component={Dangnhap} />
    <Stack.Screen name="Taotaikhoan" component={Taotaikhoan} />
    <Stack.Screen name="Laylaimatkhau" component={Laylaimatkhau} />
    <Stack.Screen name="Home" component={MyDrawer} />
    <Stack.Screen name="Hometodo" component={Hometodo} />
  </Stack.Navigator>
);

export default AuthStack;
