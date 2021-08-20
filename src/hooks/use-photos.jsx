import React from 'react'

import AppContext from '../../context/AppContext'

const usePhotos = () => {
  const [photos, setPhotos] = React.useState(null)
  const {
    auth: { getUserDetails },
  } = React.useContext(AppContext)
  const { id: userId = '' } = getUserDetails()

  React.useEffect(() => {
    const getTimeLinePhotos = async () => {}
  }, [])
  return { photos }
}

export default usePhotos
