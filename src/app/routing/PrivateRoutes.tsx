import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
// import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import { ProductsPage } from '../pages/products/ProductsPage'
import { BrandsPage } from "../pages/brands/BrandsPage"
import { CreateBrand } from '../components/brandpage/CreateBrand'
import EditBrand from '../components/brandpage/EditBrand'
import { CreateProduct } from '../components/productpage/CreateProduct'
import EditProduct from '../components/productpage/EditProduct'
// import Categories from '../components/category/Categories'
import CategoryPage from '../pages/category/CategoryPage'
import { CreateCategory } from '../components/category/CreateCategory'
import RelationPage from '../pages/relation/RelationPage'
import { CreateRelations } from '../components/relations/CreateRelations'
import UserPage from '../pages/users/UserPage'
import { CreateUser } from '../components/userPage/CreateUser'

const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/products' />} />
        {/* Pages */}
         <Route path='products' element={<ProductsPage />} />
         <Route path='products/create' element={<CreateProduct />} />
         <Route path='products/edit/:id' element={<EditProduct />} />



         <Route path='brands' element={<BrandsPage />} />
         <Route path='brands/create' element={<CreateBrand />} />
         <Route path='brands/edit/:id' element={<EditBrand />} />


         <Route path='category' element={<CategoryPage />} />
         <Route path='category/create' element={<CreateCategory />} />


         <Route path='relation' element={<RelationPage />} />
         <Route path='relation/create' element={<CreateRelations />} />


         <Route path='user' element={<UserPage />} />
         <Route path='user/create' element={<CreateUser />} />

       
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

// const SuspensedView: FC<WithChildren> = ({children}) => {
//   const baseColor = getCSSVariableValue('--bs-primary')
//   TopBarProgress.config({
//     barColors: {
//       '0': baseColor,
//     },
//     barThickness: 1,
//     shadowBlur: 5,
//   })
//   return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
// }

export {PrivateRoutes}
