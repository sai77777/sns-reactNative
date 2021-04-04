import { firestore } from 'firebase'
import { db, storage } from './firebase'
import { buildTweet, CreateTweet } from '../entities/Tweet'

const usersFirestoreRef = db.collection('users')
const usersStorageRef = storage.ref('users')

// TODO: 画像を'users/{uid}/tweets/{tweetID}/xxx.png'に画像を保存する
// eslint-disable-next-line @typescript-eslint/no-empty-function
const setTweetImage = async (uid: string, tweetID: string, fileName: string, blob: Blob) => {}

export const getTweetsRef = (uid: string) => {
  const tweetsRef = usersFirestoreRef.doc(uid).collection('tweets')
  return tweetsRef
}

export const createTweet = async (uid: string, data: CreateTweet) => {
  const tweetsRef = getTweetsRef(uid)

  await tweetsRef.add({
    text: data.text,
    fileURLs: [],
    writer: data.writer,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: firestore.FieldValue.serverTimestamp(),
  })
  return { result: true }
}
