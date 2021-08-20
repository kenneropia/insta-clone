import React, { useEffect, lazy, Suspense } from 'react'
import Skeleton from 'react-loading-skeleton'
import Header from '../components/header'

import Timeline from '../components/timeline'

const Sidebar = lazy(() => import('../components/sidebar'))

const DashBoard = () => {
  useEffect(() => {
    document.title = 'Instagram'
  }, [])

  return (
    <div className="bg-gray-background text-black-light">
      <Header />
      <div className="container flex flex-row space-x-24 md:mx-16 px-0">
        <Timeline />
        <Suspense
          fallback={
            <div className="w-3/12 h-auto p-4 mr-0  md:flex items-start hidden flex-col">
              <Skeleton count={1} width={300} height={70} />
              <Skeleton count={1} width={300} height={120} />
            </div>
          }
        >
          <Sidebar />
        </Suspense>
      </div>
    </div>
  )
}

export default DashBoard
