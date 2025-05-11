// CustomDrawerBar.js
import React from 'react';
import { Drawer, Divider } from 'react-native-paper';

const CustomDrawerBar = ({ navigation, state }) => {
  const activeRoute = state.routeNames[state.index];
  const handleLogout = async () => {
    try {
     
      await AsyncStorage.removeItem('userToken');  

    
      navigation.replace('Dangnhap');
    } catch (error) {
      console.log('Logout error', error);
    }
  };
  return (
    <Drawer.Section title="Admin">
      <Drawer.Item
        label="Home"
        icon="home"
        active={activeRoute === 'Home'}
        onPress={() => navigation.navigate('Home')}
      />
      <Drawer.Item
        label="Profile"
        icon="account"
        active={activeRoute === 'Profile'}
        onPress={() => navigation.navigate('Profile')}
      />
      <Drawer.Item
        label="Setting"
        icon="cog"
        active={activeRoute === 'Setting'}
        onPress={() => navigation.navigate('Setting')}
      />
      <Drawer.Item
        label="Details"
        icon="information"
        active={activeRoute === 'Details'}
        onPress={() => navigation.navigate('Details')}
      />

      <Divider />

      <Drawer.Item
        label="Todo"
        icon="check"
        active={activeRoute === 'Hometodo'}
        onPress={() => navigation.navigate('Hometodo')}
      />
      <Drawer.Item
        label="Logout"
        icon="logout"
        onPress={handleLogout}
      />
    </Drawer.Section>
  );
};

export default CustomDrawerBar;
