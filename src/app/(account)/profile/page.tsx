import React, { Suspense } from 'react'
import ProfileLayout from './_components/ProfileLayout'

function page() {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <ProfileLayout />
      </Suspense>
    </div>
  )
}

export default page