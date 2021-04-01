import React, { useState, useCallback } from 'react'
import { ScrollView, View, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Dimensions } from 'react-native'
import { EvilIcons, AntDesign } from '@expo/vector-icons'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useNavigation, useRoute } from '@react-navigation/core'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { CreateTweet } from '../entities/Tweet'
import { auth } from '../repositories/firebase'
import { createTweet } from '../repositories/tweet'
import { getUserRef } from '../repositories/user'
import { pickImageFromDevice, convertURLToBlob } from '../services/image'
import { useUser } from '../services/hooks/user'
import TextButton from '../components/atoms/textButton'
import FilledButton from '../components/atoms/filledButton'
import Fab from '../components/atoms/fab'
import Avatar from '../components/atoms/avatar'
import Separator from '../components/atoms/separator'
import Spacer from '../components/atoms/spacer'
import LoadingModal from '../components/moleculars/loadingModal'
import TweetPreview from '../components/organisms/tweetPreview'

const FULL_WIDTH = Dimensions.get('window').width

const CreateTweetScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const route = useRoute()
  const [text, setText] = useState<string>('')
  const [fileURLs, setFileURLs] = useState<string[]>([])
  const [firebaseUser] = useAuthState(auth)
  const [user, loading] = useUser(firebaseUser.uid)
  const [fetching, setFetching] = useState<boolean>(false)


  const onTweet = useCallback(
    async (text: string) => {
      try {
        if (!user) return
        const userRef = getUserRef(firebaseUser.uid)
        const data: CreateTweet = {
          text,
          writer: {
            ref: userRef,
          },
        }
        await createTweet(firebaseUser.uid, data)
        setText('')
        setFetching(false)
        navigation.goBack()
      } catch (e) {
        console.warn(e)
        setFetching(false)
        Alert.alert('エラー', e)
      }
    },
    [firebaseUser.uid, navigation, user]
  )

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.actionBar}>
        <TextButton text="キャンセル" fontSize={14} onPress={navigation.goBack} />
        <FilledButton text="ツイートする" fontSize={14} onPress={() => onTweet(text)} />
      </View>
      <View style={styles.content}>
        { user && <Avatar uri={user.thumbnailURL ?? undefined} />}
        <TextInput
          autoFocus={true}
          style={styles.input}
          multiline={true}
          placeholder="いまどうしてる？"
          value={text}
          onChangeText={setText}
        />
      </View>  
    </View>
  
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  bottomActionBarWrapper: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
  },
  imageWrapper: {
    position: 'relative',
  },
  removeImageIconWrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  actionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  bottomActionBar: {
    width: FULL_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f8f8f8',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  files: {
    paddingHorizontal: 24,
  },
  origin: {
    paddingHorizontal: 24,
  },
  input: {
    fontSize: 18,
    padding: 12,
  },
  image: {
    width: FULL_WIDTH - 24 * 2,
    height: FULL_WIDTH - 24 * 2,
    borderRadius: 10,
  },
})

export default CreateTweetScreen
