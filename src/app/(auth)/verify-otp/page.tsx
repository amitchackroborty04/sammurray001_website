import React, { Suspense } from 'react'
import OtpVerificationForm from './_components/OtpFrom'

const page = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <OtpVerificationForm/>
    </Suspense>
  )
}

export default page
