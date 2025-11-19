import React, { Suspense } from 'react'
import Find_spacePage from './_components/Fing_spacePage'

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
      <Find_spacePage/>
      </Suspense>
    </div>
  )
}

export default page
