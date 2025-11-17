import React, { Suspense } from 'react'
import UpdatePasswordPage from './_components/Reset-passwordFrom'

const page = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <UpdatePasswordPage/>
    </Suspense>
  )
}

export default page
