import React, { useState, useContext, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useParams } from 'react-router-dom'
import query from '../../helpers/apiQuery'
import AppContext from './../../context/AppContext'

export default function ProfileHeader({ user }) {
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
    <div className="flex mx-24 text-black-light">
      <div className="w-4/12 ">
        <img
          className="rounded-[200px]"
          width="150px"
          height="150px"
          src={user.profile_pic?.profile_pic?.url}
        />
      </div>
      <div className="w-full">
        <div className="h-full ml-6">
          <div>
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
                {!isFollowingProfile ? 'unfollow' : 'follow'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
