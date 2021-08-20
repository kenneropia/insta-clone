import React, { memo, useContext } from 'react'
import User from './user'
import Suggestions from './suggestions'

import AppContext from '../../context/AppContext'

const SideBar = () => {
  const {
    auth: { getUserDetails },
  } = useContext(AppContext)

  const { id, username, profile_pic } = getUserDetails()
  return (
    <div className="w-3/12 h-auto p-4 mr-0 md:flex items-start hidden flex-col">
      <User username={username} profile_pic={profile_pic} />
      <Suggestions userId={id} />
    </div>
  )
}

SideBar.whyDidYouRender = true

export default memo(SideBar)
