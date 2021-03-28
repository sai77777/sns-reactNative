import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
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

  const goToCreateTweet = useCallback(() => {
    navigation.navigate('CreateTweet')
  }, [navigation])

  return (
    <View style={styles.root}>
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
