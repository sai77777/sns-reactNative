import React, { useCallback, useLayoutEffect, useEffect } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/core'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MaterialIcons } from '@expo/vector-icons'
import { auth } from '../repositories/firebase'
import { useUser } from '../services/hooks/user'
import { useFollowTweetPaginator } from '../services/hooks/followTweet'
import Fab from '../components/atoms/fab'
import Avatar from '../components/atoms/avatar'
import TweetList from '../components/organisms/tweetList'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [firebaseUser] = useAuthState(auth)
  const [user] = useUser(firebaseUser.uid)
  const [onFetch, { values, loading }] = useFollowTweetPaginator(firebaseUser.uid)

  useEffect(() => {
    onFetch({ initialize: true })
  }, [onFetch])

  const goToTweet = useCallback(
    (uid: string, tweetID: string) => {
      navigation.dispatch(StackActions.push('Tweet', { uid, tweetID }))
    },
    [navigation]
  )

  const goToCreateTweet = useCallback(() => {
    navigation.dispatch(StackActions.push('CreateTweet'))
  }, [navigation])

  const goToUser = useCallback(
    (uid) => {
      navigation.dispatch(StackActions.push('User', { uid }))
    },
    [navigation]
  )

  const renderHeaderLeft = useCallback(() => {
    return (
      <View style={styles.headerLeftWrapper}>
        <TouchableOpacity onPress={() => goToUser(firebaseUser.uid)}>
          <Avatar size="s" uri={(user && user.thumbnailURL) ?? undefined} />
        </TouchableOpacity>
      </View>
    )
  }, [firebaseUser, goToUser, user])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
    })
  }, [navigation, renderHeaderLeft])

  return (
    <View style={styles.root}>
      <TweetList
        data={values}
        refreshing={loading}
        onRefresh={() => onFetch({ initialize: true })}
        onEndReached={() => onFetch({ initialize: false })}
        onPressCard={goToTweet}
        onPressAvatar={goToUser}
      />
      <View style={styles.fabWrapper}>
        <Fab onPress={goToCreateTweet}>
          <MaterialIcons name="edit" size={24} color="#ffffff" />
        </Fab>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(230, 236, 240)',
  },
  headerLeftWrapper: {
    paddingLeft: 24,
  },
  fabWrapper: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
})

export default HomeScreen
