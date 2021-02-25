import React, { useCallback, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'
import { signInGoogle } from '../services/auth/google'
//import { signInFaceBook } from '../services/auth/facebook'
import FilledButton from '../components/atoms/filledButton'
import Spacer from '../components/atoms/spacer'
import {useAuthState} from 'react-firebase-hooks/auth'
import firebase from '../repositories/firebase'
import { useNavigation } from '@react-navigation/core'
import { fromNow } from '../services/date'

const WelcomeScreen = () => {
   
  //Lesson1: アプリにログインログアウトを実装してみよう
  const navigation = useNavigation()
  const [user] = useAuthState(firebase.auth())

  const onPressSignInGoogle = useCallback(async () => {
    const { canceled, error } = await signInGoogle()
    if (canceled) {
      return alert('ログインに失敗しました')
    }
    if (error) {
      return alert('ログインをキャンセルしました')
    }
  }, [])

  // const onPressSignInFaceBook = useCallback(async () => {
  //   const { canceled, error } = await signInFaceBook()
  //   if (canceled) {
  //     return alert('ログインに失敗しました')
  //   }
  //   if (error) {
  //     return alert('ログインをキャンセルしました')
  //   }
  // }, [])

  //Lesson1: アプリにログインログアウトを実装してみよう
  useEffect(() => {

    if(!user || !user.uid) return
    navigation.navigate('Main')
  }, [user, navigation])

  return (
    <View style={styles.root}>
      <Text style={styles.messageText}>「いま」起きていることを見つけよう。</Text>
      <Spacer size="xl" />
      <View style={styles.buttonWrapper}>
        <FilledButton text="Googleアカウントではじめる" fontSize={18} onPress={onPressSignInGoogle} />
        {/* <FilledButton text="FaceBookアカウントではじめる" fontSize={18} onPress={onPressSignInFaceBook} /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 24,
  },
  buttonWrapper: {
    width: '100%',
  },
  messageText: {
    fontSize: 36,
    lineHeight: 36 * 1.4,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default WelcomeScreen
