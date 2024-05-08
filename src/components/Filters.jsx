import { Form, Link, useLoaderData } from 'react-router-dom'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormRange from './FormRange'

const Filters = () => {
  const { meta } = useLoaderData()
  console.log(meta)
  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      <FormInput
        type='search'
        label='search product'
        name='search'
        size='input-sm'
      />
      <FormSelect
        label='category'
        name='category'
        list={meta.categories}
        size='select-sm'
      />
      <FormSelect
        label='company'
        name='company'
        list={meta.companies}
        size='select-sm'
      />
      <FormSelect
        label='sort by'
        name='order'
        list={['a-z', 'z-a', 'high', 'low']}
        size='select-sm'
      />
      <FormRange label='select price' name='price' size='range-sm' />

      <button type='submit' className='btn btn-primary btn-sm'>
        search
      </button>
      <Link to='/products' className='btn btn-accent btn-sm'>
        reset
      </Link>
    </Form>
  )
}

export default Filters
