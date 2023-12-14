import React from 'react';
import { View } from 'react-native';
import LoginForm from '../../components/forms/LoginForm';

const LoginScreen = () => {
    const handleLogin = (credentials) => {
        // Implement login logic using credentials
        console.log('Login with:', credentials);
    };

    return (
        <View>
        <LoginForm onLogin={handleLogin} />
        </View>
    );
};

export default LoginScreen;
