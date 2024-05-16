import { Form, Link, redirect } from 'react-router-dom'

import { FormInput, SubmitBtn } from '../components'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { loginUser } from '../features/user/userSlice'

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      const resp = await customFetch.post('/auth/local', data)
      store.dispatch(loginUser(resp.data))
      toast.success('logged successfully')

      return redirect('/')
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your credentials'

      toast.error(errorMessage)
      return null
    }
  }

const Login = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='post'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>

        <FormInput type='email' name='identifier' label='email' />
        <FormInput type='password' name='password' label='password' />

        <div className='mt-4'>
          <SubmitBtn text='login' />
        </div>
        <button type='button' className='btn btn-secondary btn-block'>
          guest user
        </button>
        <p className='text-center'>Not a member yet?</p>
        <Link
          to='/register'
          className='ml-2 link link-hover link-primary capitalize'
        >
          register
        </Link>
      </Form>
    </section>
  )
}

export default Login
