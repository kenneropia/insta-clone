import React, { useReducer, useEffect } from 'react'

import query from './../../helpers/apiQuery'
import ProfileHeader from './profileHeader'
import Photos from './photos'

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState })
  const initialState = {
    profile: {},
    photosCollection: null,
    followshipCount: {},
  }
  const [{ profile, photosCollection, followshipCount }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(async () => {
    let postImages = await query.getImagesOfUser()
    let followship = await query.getFollowship(user.id)
    dispatch({
      profile: user,
      photosCollection: postImages,
      followshipCount: followship,
    })
  }, [])

  return (
    <>
      <ProfileHeader
        photosCount={photosCollection ? photosCollection.length : 0}
        followshipCount={followshipCount}
        user={user}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  )
}
