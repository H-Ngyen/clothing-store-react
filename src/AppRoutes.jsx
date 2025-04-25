import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Layout from './layouts/layout'
import LoginPage from './pages/LoginPage'
import ProductManagementPage from './pages/ProductManagementPage'
import HomePage from './pages/HomePage'
import CollectionPage from './pages/CollectionPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProductDetailPage from './pages/ProductDetailPage'
import RegisterPage from './pages/RegisterPage'

function AppRoutes() {
  const isLoggedIn = !!localStorage.getItem('token')
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout><HomePage /></Layout>}></Route>
          <Route path='/home' element={<Layout><HomePage /></Layout>}></Route>
          <Route path='/collection' element={<Layout><CollectionPage /></Layout>}></Route>
          <Route path='/about-us' element={<Layout><AboutPage /></Layout>}></Route>
          <Route path='/contact' element={<Layout><ContactPage /></Layout>}></Route>
          <Route path='/product-detail/:id' element={<Layout><ProductDetailPage /></Layout>}></Route>

          <Route path='/register-form' element={<Layout><RegisterPage /></Layout>}></Route>
          <Route path='/login-form' element={<Layout><LoginPage /></Layout>}></Route>
          <Route path='/admin-product-management' element={<Layout>{isLoggedIn ? <ProductManagementPage /> : <Navigate to={'/login-form'} /> }</Layout>}></Route>

          <Route path='/*' element={<Layout><HomePage /></Layout>}></Route>
        </Routes>
      </Router>
    </>
  )
}


export default AppRoutes