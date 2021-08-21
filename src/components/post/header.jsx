import React from 'react'
import { Link } from 'react-router-dom'
import * as IMAGES from './../../constants/default_images'

const Header = ({ user }) => {
  return (
    <div
      className="flex border-b border-gray-primary h-4 
        p-4 py-8"
    >
      <div className="flex items-center">
        <Link to={`/p/${user.username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={user.profile_pic?.profile_pic?.url}
            onError={(e) => {
              e.target.src = IMAGES.DEFAULT_IMAGE_PATH
            }}
          />
          <p className="font-bold">{user.username}</p>
        </Link>
      </div>
    </div>
  )
}

export default Header
