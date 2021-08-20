import React, { memo } from 'react'

import { Link } from 'react-router-dom'
import propTypes from 'prop-types'

import * as IMAGES from './../../constants/default_images'

const User = ({ username, profile_pic }) => {
  return !username && !profile_pic ? (
    ' '
  ) : (
    <Link
      to={`/p/${username}`}
      className="flex justify-between space-x-4 mb-3 "
    >
      <div className="flex items-center cursor-pointer">
        <img
          className="rounded-full h-12 w-12 flex"
          src={`${profile_pic}`}
          alt=""
          onError={(e) => {
            e.target.src = IMAGES.DEFAULT_IMAGE_PATH
          }}
        />
      </div>
      <div>
        <p className="font-bold text-base">{username.split(' ')[0]}</p>
        <p className="text-base">{username}</p>
      </div>
    </Link>
  )
}

export default memo(User)

User.propTypes = {
  username: propTypes.string.isRequired,
  profile_pic: propTypes.string.isRequired,
}
