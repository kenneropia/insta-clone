import React, { useState, useContext, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'
import query from '../../helpers/apiQuery'
import AppContext from './../../context/AppContext'

export default function ProfileHeader({ user, photosCount, followshipCount }) {
  const [isFollowingProfile, setIsFollowingProfile] = useState(false)
  const {
    auth: { getUserDetails },
  } = useContext(AppContext)

  const authUser = getUserDetails()
  const followProfile = async () => {
    const res = await query.handleFollow(user.id)
    console.log(res)
  }

  useEffect(async () => {
    const isFollowing = await query.isUserFollowing(user.id)
    setIsFollowingProfile(isFollowing)
    console.log(isFollowing)
  }, [])
  console.log()

  return (
    <div className="flex justify-center items-center md:flex-row flex-col w-11/12  mb-6  text-black-light">
      <div className="flex justify-center  w-5/12 min-w-[200px] ">
        <img
          className="rounded-[200px]"
          width="150px"
          height="150px"
          src={user.profile_pic?.profile_pic?.url}
        />
      </div>

      <div className="flex md:ml-12 ml-0 md:items-start items-center w-full flex-col h-full md:mt-0 mt-8">
        <div className="w-36">
          <span className="inline-flex mr-3 font-semibold">
            {user.username}
          </span>
          {authUser.username != user.username ? (
            <button
              onClick={() => {
                followProfile()
              }}
              className="p-1 rounded bg-blue-medium text-white"
            >
              {isFollowingProfile ? 'following' : 'follow'}
            </button>
          ) : null}
        </div>
        <div className="inline-flex items-start flex-col  items-center mt-3">
          <div className="space-x-9">
            <span>{photosCount} posts</span>
            <span>{followshipCount.followers} followers</span>
            <span>{followshipCount.following} following</span>
          </div>
          <p className="mt-3 justify-center">{user.bio ? user.bio : null}</p>
        </div>
      </div>
    </div>
  )
}
