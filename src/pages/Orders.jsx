import { redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { customFetch } from '../utils'
import { PaginationContainer, SectionTitle, OrdersList } from '../components'
import ComplexPagination from '../components/ComplexPagination'

export const ordersQuery = (params, user) => {
  return {
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  }
}

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user

    if (!user) {
      toast.warn('You must be logged in the view orders')
      return redirect('/login')
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    try {
      const resp = await queryClient.ensureQueryData(ordersQuery(params, user))

      return {
        orders: resp.data.data,
        meta: resp.data.meta,
      }
    } catch (error) {
      console.log(error)
      const errorMsg =
        error?.response?.data?.error?.message ||
        'there was an error accessing your orders'

      toast.error(errorMsg)

      if (error?.response?.status === 401 || error?.response?.status === 403)
        return redirect('/login')

      return null
    }
  }
const Orders = () => {
  const { meta } = useLoaderData()

  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />
  }

  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList />
      {/* <ComplexPagination /> */}
      <PaginationContainer />
    </>
  )
}

export default Orders
