import React from 'react'
import { Link } from 'react-router-dom'
import * as IMAGES from '../../constants/default_images'
import query from './../../helpers/apiQuery'
import AppContext from './../../context/AppContext'

console.log(query)

const SuggestedProfile = ({ profile }) => {
  const [followed, setFollowed] = React.useState(1)
  const {
    auth: { getUserDetails },
  } = React.useContext(AppContext)

  React.useEffect(async () => {
    const suggestedUser = await query.isUserFollowing(profile.id)

    setFollowed(suggestedUser)
  }, [])

  return !followed ? (
    <div className="flex flex-row items-center justify-between space-x-2">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 h-8 flex mr-3"
          src={`${profile?.profile_pic?.profile_pic?.url}`}
          alt=""
          onError={(e) => {
            e.target.src = IMAGES.DEFAULT_IMAGE_PATH
          }}
        />
        <Link to={`/p/${profile.username}`}>
          <p className="font-bold text-sm">{profile.username}</p>
        </Link>
      </div>
      <button
        className="text-xs  font-bold text-blue-medium"
        type="button"
        onClick={() => {
          query.handleFollow(profile.id)
          setFollowed(1)
        }}
      >
        Follow
      </button>
    </div>
  ) : null
}

export default SuggestedProfile
