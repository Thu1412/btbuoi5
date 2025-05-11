import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { firebase } from '@react-native-firebase/auth';

const Laylaimatkhau = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendResetEmail = async () => {
    if (email !== '') {
      try {
        // Gửi email reset mật khẩu từ Firebase Auth
        await firebase.auth().sendPasswordResetEmail(email);
        setMessage('Email reset mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư đến.');
        setShowMessage(true);
      } catch (error) {
        console.error('Lỗi reset mật khẩu:', error);
        if (error.code === 'auth/invalid-email') {
          setMessage('Email không hợp lệ, vui lòng kiểm tra lại.');
        } else if (error.code === 'auth/user-not-found') {
          setMessage('Không tìm thấy tài khoản với email này.');
        } else {
          setMessage('Đã có lỗi xảy ra, vui lòng thử lại.');
        }
        setShowMessage(true);
      }
    } else {
      setMessage('Vui lòng nhập email hợp lệ.');
      setShowMessage(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/logofirebase.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Reset your password</Text>

      <TextInput
        placeholder="Enter email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSendResetEmail}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>

      {/* Hiển thị thông báo thành công hoặc lỗi */}
      {showMessage && <Text style={styles.message}>{message}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate('Dangnhap')}>
        <Text style={styles.link}>Go back to login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',  
    backgroundColor: 'white',  
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    textAlign: 'center', 
    marginBottom: 20 ,
    color: '#333',

  },
  input: { 
    borderWidth: 1, 
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 10, 
    width: '100%',
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
    marginBottom: 20  
  },
  message: {
    marginTop: 10,
    color: 'green',  
    textAlign: 'center',
  }
});

export default Laylaimatkhau;
