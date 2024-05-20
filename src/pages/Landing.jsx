import { Hero, FeaturedProducts } from '../components'
import { customFetch } from '../utils'

const url = '/products?featured=true'

const featureProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url),
}

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featureProductsQuery)

  const products = response.data.data
  return { products }
}

const Landing = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
    </div>
  )
}

export default Landing
