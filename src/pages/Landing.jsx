import { Hero } from '../components'
import { customFetch } from '../utils'

const url = '/products?featured=true'

export const loader = async () => {
  const response = await customFetch(url)
  console.log(response)
  const product = response.data.data
  return { product }
}

const Landing = () => {
  return (
    <div>
      <Hero />
    </div>
  )
}

export default Landing
