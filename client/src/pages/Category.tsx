import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

import { ItemEntry } from '../types'
import ShirtIcon from '../components/icons/ShirtIcon'

interface ParamTypes {
  category: string
}

const Category: FC = () => {
  const { category } = useParams<ParamTypes>()
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [renderLimit, setRenderLimit] = useState(50) // limit the initial rendered items to the first 50
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  // API-request to backend
  useEffect(() => {
    setItems([])
    setLoading(true)
    setRenderLimit(50)
    axios.get(`/api/category/${category}`)
      .then(response => {
        setItems(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }, [category])

  useEffect(() => {
    // detect when user has scrolled to the bottom of the screen and load more items
    const handleScroll = () => {
      if ((window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) && !loading) {
        if (filteredItems.length > renderLimit) // only render more items if the current cap is filled
          setRenderLimit(renderLimit + 50)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [renderLimit, loading])

  useEffect(() => {
    setFilteredItems(items.filter((item: ItemEntry) => item.name.toLowerCase().includes(filter.toLowerCase())))
  }, [items, filter])

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className='flex justify-center my-2'>
        <input
          className='border border-primary-400 hover:border-primary-600 focus:border-primary-600 px-2 py-1 rounded focus:outline-none'
          type='text'
          placeholder='filter by name...'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>
      {loading && <div className='w-full text-center text-gray-600 text-lg my-2'>Loading data...</div>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 m-2'>
        {filteredItems.slice(0, renderLimit).map((item: ItemEntry) =>
          <div key={item.id} className='bg-primary-300 p-2'>
            <ShirtIcon className='w-1/2 mx-auto my-1' />
            <ul>
              <li><span className='font-semibold'>Name:</span> {item.name}</li>
              <li><span className='font-semibold'>Colors:</span> {item.color.map((color: string) =>
                <span key={color} style={{ color }}>{color}, </span>
              )}</li>
              <li><span className='font-semibold'>Manufacturer:</span> {item.manufacturer}</li>
              <li><span className='font-semibold'>Price:</span> {item.price} Units of currency</li>
              <li><span className='font-semibold'>Availability:</span> {item.availability}</li>
            </ul>
          </div>
        )}
      </div>
      <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  )
}

export default Category