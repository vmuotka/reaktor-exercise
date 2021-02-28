import { FC } from 'react'

const Home: FC = () => {
  return (
    <div className='flex flex-col items-center mx-4 text-center'>
      <h1 className='text-gray-700 text-4xl my-2'>Welcome, employee!</h1>
      <p className='text-gray-600 text-lg my-2'>
        This web app serves as a catalogue for our warehouses.
      </p>
      <p className='text-gray-600 max-w-2xl'>
        For developers: The legacy APIs that contain our catalogy data have an internal cache of about 5 minutes and our backend API has a cache of 2,5 minutes to reduce load times.
      </p>
    </div>
  )
}

export default Home