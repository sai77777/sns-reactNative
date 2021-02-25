import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { View, Text, StyleSheet } from 'react-native'
import TabNavigator from './tabNavigator'
import WelcomeNavigator from './welcomeNavigator'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
//import AuthErrorScreen from '../screens/WelcomeScreen'
import firebase from '../repositories/firebase'
import { useUser } from '../services/hooks/user'
import { createStackNavigator } from '@react-navigation/stack'
import { exit } from 'process'

const Stack = createStackNavigator()

// const CheckUserDataNavigator = ({ uid }: { uid: string }) => {
//   const [user, loading, error] = useUser(uid)

//   if (loading || (!loading && !user)) {
//     return <AuthLoadingScreen />
//   }

//   if (error) {
//     return <AuthErrorScreen />
//   }

//   return <TabNavigator />
// }


const AppNavigator = () => {
  const [user, initializing, error] = useAuthState(firebase.auth())


  if (initializing) {
    return (
    <View>
      <Text>initializing...</Text>
    </View>
    )
  }

  if (error) {
    return (
    <View>
      <Text>error</Text>
    </View>
    )
  }

  // if (user) {
  //   return <CheckUserDataNavigator uid={user.uid} />
  // }

  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false}} headerMode="none">
      {
        //Lesson1: アプリにログインログアウトを実装してみよう
        user && user.uid && <Stack.Screen name="Main" component={TabNavigator} />
      }
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false}} />
  </Stack.Navigator>
  )
}

export default AppNavigator
