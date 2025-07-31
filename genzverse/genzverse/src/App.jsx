
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'
// import './App.css'
import AuthLayout from './components/ui/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/home'
import ShoppinListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import ProductDetailsPage from './pages/shopping-view/productDetails'
import CartPage from './pages/shopping-view/cart-wrapper'
import OversizedTShirtsPage from './pages/shopping-view/oversized'
import AboutUs from './pages/quick-links/about'
import ContactUs from './pages/quick-links/contact'
import RefundPolicy from './pages/quick-links/refund-policy'
import SearchPage from './pages/shopping-view/search'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaymentSuccessPage from './pages/shopping-view/payment-success'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'




function App() {


  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <ScrollToTop />
      <Routes>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='features' element={<AdminFeatures />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppinListing />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='product/:productId/:slug' element={<ProductDetailsPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='oversized-t-shirts' element={<OversizedTShirtsPage />} />
          <Route path='paypal-return' element={<PaypalReturnPage />}/>
          <Route path='payment-success' element={<PaymentSuccessPage />}/>
          <Route path='search' element={<SearchPage />} />
        </Route>
        <Route path='/page' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='about' element={<AboutUs />} />
          <Route path='contact' element={<ContactUs />} />
          <Route path='refund-policy' element={<RefundPolicy />} />
        </Route>
        <Route path='/unauth-page' element={<UnauthPage />} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App
