import React, { useReducer, useEffect } from 'react'

import query from './../../helpers/apiQuery'
import ProfileHeader from './profileHeader'
import Photos from './photos'

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState })
  const initialState = { profile: {}, photosCollection: [], followerCount: 0 }
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(async () => {
    let postImages = await query.getImagesOfUser()
    let followships = await query.getFollowship(user.id)
    dispatch({
      profile: user,
      photosCollection: postImages,
      followerCount: followships.following,
    })
  }, [])

  return (
    <>
      <ProfileHeader
        photosCount={photosCollection ? photosCollection.length : 0}
        followerCount={followerCount}
        user={user}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  )
}
