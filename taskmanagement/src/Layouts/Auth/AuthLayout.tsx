
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='w-screen h-screen bg-gray-200 flex flex-col'>
      <Outlet/>
    </div>
  )
}

export default AuthLayout