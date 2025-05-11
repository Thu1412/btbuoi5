import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation, route }) => {
  // Lấy email từ params nếu có, nếu không có thì mặc định là 'Admin'
  const email = route?.params?.email || 'Admin';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {email ? `Hello, ${email}` : ''}
      </Text>
      <Button title="Go to Detail" onPress={() => navigation.navigate('Details')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  text: {
    fontSize: 20, marginBottom: 20
  }
});

export default Home;
