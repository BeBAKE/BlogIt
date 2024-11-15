import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
// import { RouterProvider ,createBrowserRouter as Browser, createBrowserRouter} from 'react-router-dom'
// import Signup from "./pages/Signup"
// import Blog from './pages/Blog'
// import Landing from './pages/Landing'
// import Signin from './pages/Signin'
// import ErrorPage from './pages/ErrorPage'
// import StatusBar from './components/StatusBar/StatusBar'
// import BlogsList from './pages/BlogsList'
// import CreateBlog from './pages/CreateBlog'

// const router = Browser([
//   {
//     path : '/',
//     element : <Landing/>,
//     errorElement: <ErrorPage />,
//     children : [
//       { 
//         path : '/signin',
//         element : <Signin/>,
//         index 
//       },
//       {
//         path : '/signup',
//         element : <Signup/>
//       },
//     ]
//   },
//   {
//     path : '/blog',
//     element : <Blog/>
//   },
//   {
//     path : '/test',
//     element : <CreateBlog/>
//   }
  
// ])



createRoot(document.getElementById('root')!).render(
  // <RouterProvider router={router} />
  <RecoilRoot>
    <App/>
  </RecoilRoot>

)
