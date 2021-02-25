import React, { useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { useRoute, useNavigation, StackActions } from '@react-navigation/native'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { signout } from '../repositories/firebase'
import { follow, unfollow } from '../services/follow'
import { useUser } from '../services/hooks/user'
import { useFollowUser } from '../services/hooks/followUser'
import Spacer from '../components/atoms/spacer'
import Avatar from '../components/atoms/avatar'
import OutlinedButton from '../components/atoms/outlinedButton'
import FilledButton from '../components/atoms/filledButton'
import { TouchableOpacity } from 'react-native-gesture-handler'

const coverImageURL =
  'https://image.shutterstock.com/z/stock-photo-friendly-romantic-encounter-boys-and-girls-autumn-day-in-the-old-town-363511535.jpg'

const UserScreen = () => {
  //const navigation = useNavigation()
  //const route = useRoute()
  //const uid = (route.params as any).uid

  //Lesson1: アプリにログインログアウトを実装してみよう
  const [user] = useAuthState(firebase.auth())
  const onPressLogout = useCallback(() => {
    firebase.auth().signOut()
  }, [])

  //const [firebaseUser] = useAuthState(auth)
  //const [user, loading] = useUser(uid)
  //const [followUser, followLoading] = useFollowUser(firebaseUser.uid, uid)

  
  // const isMy = useMemo(() => {
  //   return firebaseUser.uid === uid
  // }, [firebaseUser, uid])

  // const showThumbnailURL = useMemo(() => {
  //   if (user && user.thumbnailURL) {
  //     return user.thumbnailURL
  //   }

  //   return undefined
  // }, [user])

  // const onPressFollow = useCallback(async () => {
  //   await follow(firebaseUser.uid, uid)
  // }, [firebaseUser, uid])

  // const onPressUnfollow = useCallback(async () => {
  //   await unfollow(firebaseUser.uid, uid)
  // }, [firebaseUser, uid])

  // const goToUpdateUser = useCallback(() => {
  //   navigation.dispatch(StackActions.push('UpdateUser', { uid: firebaseUser.uid }))
  // }, [firebaseUser, navigation])

  // const goToFollowList = useCallback(
  //   (section: 'follow' | 'follower') => {
  //     navigation.dispatch(StackActions.push('FollowList', { uid, section }))
  //   },
  //   [uid, navigation]
  // )

  return (
    <View style={styles.root}>

    {
        //Lesson1: アプリにログインログアウトを実装してみよう
        user && user.uid && <Text>{user.uid}</Text>
    }
    {/* { uid && <Text>{uid}</Text>} */}
    {

    }
    <TouchableOpacity onPress={onPressLogout}>
      <Text>ログアウト</Text>
    </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  headSection: {
    width: '100%',
    position: 'relative',
  },
  section: {
    width: '100%',
    paddingHorizontal: 24,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  thumbnailWrapper: {
    position: 'absolute',
    top: -30,
    left: 24,
  },
  actionAreaWrapper: {
    position: 'absolute',
    top: 16,
    right: 24,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  idText: {
    fontSize: 12,
    color: 'gray',
  },
  followCountText: {
    fontSize: 12,
  },
  followLabelText: {
    fontSize: 12,
    color: 'gray',
  },
})

export default UserScreen
