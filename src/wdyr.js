// import React from 'react'

// const whyDidYouRender = async () => {
//   const ok = await import('@welldone-software/why-did-you-render')
//   return ok
// }

// console.log(whyDidYouRender)

// whyDidYouRender(React, {
//   trackAllPureComponents: true,
// })

import React from 'react'

import whyDidYouRender from '@welldone-software/why-did-you-render'

whyDidYouRender(React, {
  trackAllPureComponents: true,
  onlyLogs: true,
})
