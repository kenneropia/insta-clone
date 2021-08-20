import React from 'react'
import Skeleton from 'react-loading-skeleton'

import AppContext from './../../context/AppContext'
import query from './../../helpers/apiQuery'
import SuggestedProfile from './suggested-profile'

const Suggestions = () => {
  const [profiles, setProfiles] = React.useState(null)
  const {
    auth: { getUserDetails },
  } = React.useContext(AppContext)

  React.useEffect(async () => {
    const userId = getUserDetails().id
    const users = await query.getMultipleUsers(userId)
    setProfiles(users)
  }, [])

  return (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="space-y-2">
        {!profiles ? (
          <Skeleton count={4} width={300} height={65} />
        ) : (
          profiles.map((el) => <SuggestedProfile key={el.id} profile={el} />)
        )}
      </div>
    </div>
  )
}

export default Suggestions
