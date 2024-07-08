import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PageError from '../pages/pageerror/PageError'
import Index from '../pages/index/Index'
import Signin from '../pages/signin/Signin'
import Profile from '../pages/profile/Profile'
import './routes.css'
import Layout from '../layout/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <PageError/>,
    children: [
      {
        path: '',
        element: <Index/>,
      },
      {
        path: 'signin',
        element: <Signin/>,
      },
      {
        path: 'profile',
        element: <Profile/>,
      }
    ]
  }
])

function Router() {
  return <RouterProvider router={router}/>
}

export default Router