import * as ImagePicker from 'expo-image-picker'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import * as ImageManipulator from 'expo-image-manipulator'
import { Image } from 'react-native'
import * as FileSystem from "expo-file-system";

//TODO: maxWidthでリサイズした画像URLをリターンせよ
const manipulateImage = async (uri: string, maxWidth: number) => {
  // MEMO: {画像の横幅取得} => {リサイズする横幅・前幅取得} => {画像をリサイズする}
  
}

export const convertURLToBlob = async (url: string) => {
  // url存在する場合
  if(url){
    const response = await fetch(url)
    const blob = await response.blob()
    return blob
  }  
}


export const pickImageFromDevice = async () => {
  const pickResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
  })

  if (pickResult.cancelled) {
    return
  }

  const { uri } = (pickResult as unknown) as ImagePicker.ImagePickerResult & ImageInfo // uriを読み込もうとすると型エラーが起きるので型再定義

  //const resizeURI = manipulateImage(uri, 1080)

  return uri
}
