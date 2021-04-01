export type User = {
  id: string
  name: string
  profile: string
  thumbnailURL: string | null
  createdAt: Date
  updatedAt: Date
}
export type UpdateUser = {
  name: string
  profile: string
  thumbnailBlob?: Blob
}

export const buildUser = (id: string, data: firebase.firestore.DocumentData) => {
  const newUser: User = {
    id,
    name: data.name,
    profile: data.profile,
    thumbnailURL: data.thumbnailURL,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),

  }

  return newUser
}