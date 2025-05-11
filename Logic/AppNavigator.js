/*options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerTintColor: '#ff6347',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: '#fff', paddingLeft: 10 }}>Back</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => alert('Custom button clicked!')}>
                <Text style={{ color: '#fff', paddingRight: 10 }}>Action</Text>
              </TouchableOpacity>
            ),
          })}*/
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import Ghichu from './Ghichu';
import Themghichu from './Themghichu';
import Capnhatghichu from './Capnhatghichu';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Đăng Nhập" component={Login} />
      <Stack.Screen name="Trang chủ" component={Home}  
      options={({
        navigation,
      }) => ({
        headerTitleAlign: 'center',
        headerTintColor: '#ff6347',
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Thêm ghi chú")}>
            <Text style={{ color: '#fff', paddingLeft: 10 }}>Thêm mới</Text>
          </TouchableOpacity>
        ),
        
      })} 
      />
      <Stack.Screen name="Thêm ghi chú" component={Themghichu} />
      <Stack.Screen name="Ghichu" component={Ghichu} />
      <Stack.Screen name="Capnhatghichu" component= {Capnhatghichu} />
      <Stack.Screen name="Đăng Ký" component= {Signup} />
    </Stack.Navigator>
  );
}
