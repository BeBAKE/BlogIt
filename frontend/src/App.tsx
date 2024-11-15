// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Browser , Route , Routes } from 'react-router-dom'
import Signup from "./pages/Signup"
import BlogPage from './pages/BlogPage'
import Landing from './pages/Landing'
import Signin from './pages/Signin'
import ErrorPage from './pages/ErrorPage'
import StatusBar from './components/StatusBar/StatusBar'
import BlogsHome from './pages/BlogsHome'
import CreateBlog from './pages/CreateBlog'
import Test from "./pages/test"
import { ToastContainer } from 'react-toastify'
import MenuFullPage from './pages/MenuFullPage'
import Bookmark from './components/Menu/Bookmark'
import Draft from './components/Draft/Draft'


function App() {

  return (<>
  
  <Browser>
    <Routes>
      <Route element={<Landing/>}>  
        <Route element={<Signin/>} path='/signin' index/>
        <Route element={<Signup/>} path='/signup'/>
      </Route>
      <Route element={<StatusBar/>}>
        <Route element={<BlogsHome/>} path='/blogs' index/>
        <Route element={<BlogPage/>} path='/blogs/:id'/>
        <Route element={<MenuFullPage/>}>
          <Route element={<Bookmark/>} path='/menu/bookmarks'/>
          <Route element={<Draft/>} path='/menu/drafts'/>
        </Route>
      </Route>
      <Route element={<CreateBlog/>} path='/blogs/create/:id' />
      <Route element={<ErrorPage/>} path='/*'/>
      <Route element={<Test/>} path="/test"/>        
    </Routes>
  </Browser>
  
  <ToastContainer
    position="top-center"
    autoClose={3000}
    limit={1}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover={false}
    theme="light"
    />
  </>
  )
}

export default App
