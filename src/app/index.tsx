import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RootPage() {
  const handleUserLogin = () => {
    router.push('/user/home' as any);
  };

  const handleDriverLogin = () => {
    router.push('/driver/home' as any);
  };

  const handleAdminLogin = () => {
    router.push('/admin/dashboard' as any);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/logo-glow.png')} 
        style={styles.logo} 
      />
      <Text style={styles.title}>快狗打车</Text>
      <Text style={styles.subtitle}>选择您的角色</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.userButton]} 
          onPress={handleUserLogin}
        >
          <Text style={styles.buttonText}>用户端</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.driverButton]} 
          onPress={handleDriverLogin}
        >
          <Text style={styles.buttonText}>司机端</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.adminButton]} 
          onPress={handleAdminLogin}
        >
          <Text style={styles.buttonText}>后台管理</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B00',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  userButton: {
    backgroundColor: '#FF6B00',
  },
  driverButton: {
    backgroundColor: '#4CAF50',
  },
  adminButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});