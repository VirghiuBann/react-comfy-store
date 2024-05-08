import { Filters, PaginationContainer, ProductsContainer } from '../components'
import { customFetch } from '../utils'

const url = '/products'
export const loader = async () => {
  const response = await customFetch(url)
  console.log(response)
  const products = response.data.data
  const meta = response.data.meta
  return { products, meta }
}

const Products = () => {
  return (
    <div>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </div>
  )
}

export default Products
