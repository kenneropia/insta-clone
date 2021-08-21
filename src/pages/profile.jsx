import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import query from './../helpers/apiQuery'
import Header from '../components/header'
import UserProfile from '../components/profile'

export default function Profile() {
  const history = useHistory()
  const [user, setUser] = useState(null)
  const { username } = useParams()
  useEffect(async () => {
    const retrievedUser = await query.getAUser(username)
    if (retrievedUser) {
      setUser(retrievedUser)
    } else {
      setUser(false)
    }
  }, [])

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container flex flex-col items-center md:mx-auto max-w-screen-lg h-full  my-7 ">
        {user == null ? (
          <Loader type="TailSpin" color="#00BFFF" height={200} width={200} />
        ) : user ? (
          <UserProfile user={user} />
        ) : (
          <p>Sorry, this username doesn't exist, maybe you got it wrong</p>
        )}
      </div>
    </div>
  )
}
