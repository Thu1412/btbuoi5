import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const Taotaikhoan = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleTaotaikhoan = async () => {
  if (password === confirmPassword) {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      setMessage('Tạo tài khoản thành công!');
      Alert.alert('Thành công', 'Tài khoản đã được tạo. Bạn có thể đăng nhập ngay bây giờ.');
      navigation.navigate('Dangnhap');
    } catch (error) {
      console.error('Lỗi tạo tài khoản:', error);
      if (error.code === 'auth/email-already-in-use') {
        setMessage('Email này đã được sử dụng.');
      } else if (error.code === 'auth/invalid-email') {
        setMessage('Email không hợp lệ.');
      } else if (error.code === 'auth/weak-password') {
        setMessage('Mật khẩu phải ít nhất 6 ký tự.');
      } else {
        setMessage('Đã có lỗi xảy ra, vui lòng thử lại.');
      }
    }
  } else {
    setMessage('Mật khẩu không khớp! Vui lòng thử lại.');
  }
};
  return (
    <View style={styles.container}>
      <Image
        source={require("../images/logofirebase.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Create a new account!</Text>

      <TextInput
        placeholder="Enter email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Enter password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleTaotaikhoan}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Hiển thị thông báo */}
      {message !== '' && <Text style={styles.message}>{message}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate('Dangnhap')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: 'white'  
  },
  title: { 
    fontSize: 24, 
    textAlign: 'center', 
    marginBottom: 20 ,
    fontWeight: 'bold',
    color: '#333',
  },
  input: { 
    borderWidth: 1, 
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 10, 
    width: '100%' ,
    backgroundColor: '#f0f4f8',
    color: '#333',
  },
  button: { 
    backgroundColor: 'orange', 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 10, 
    width: '100%' 
  },
  buttonText: { 
    textAlign: 'center', 
    color: 'white', 
    fontWeight: 'bold' 
  },
  link: { 
    color: 'blue', 
    marginTop: 10, 
    textAlign: 'center' 
  },
  image: { 
    width: 150,
    height: 150, 
    alignSelf: 'center', 
    marginBottom: 20 
  },
  message: {
    marginTop: 10,
    color: 'green',  
    textAlign: 'center',
  },
});

export default Taotaikhoan;
