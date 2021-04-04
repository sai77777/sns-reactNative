import { Platform } from 'react-native'
import firebase from '../../repositories/firebase'
import * as AppAuth from 'expo-app-auth'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import * as Facebook from 'expo-facebook'

type Result = {
  success?: boolean
  canceled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

//宿題FaceBook認証
export const signInFaceBook = async (): Promise<Result> => {
  try {
    await Facebook.initializeAsync({
      appId: process.env.FACEBOOK_ID,
    })
    const result = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    })

    if (result.type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(result.token)
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          throw new Error(error)
        })
      return { success: true }
    } else {
      return { canceled: true }
    }
  } catch (e) {
    console.warn(e)
    return { error: e }
  }
}
