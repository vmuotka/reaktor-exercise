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

  useEffect(() => {
    axios.get(`/api/category/${category}`)
      .then(response => {
        setItems(response.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [category])

  console.log(items)

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 m-2'>
        {items.map((item: ItemEntry) =>
          <div key={item.id} className='bg-primary-300 p-2'>
            <ShirtIcon className='w-1/2 mx-auto my-1' />
            <ul>
              <li><span className='font-semibold'>Name:</span> {item.name}</li>
              <li><span className='font-semibold'>Colors:</span> {item.color.map((color: string) =>
                <span key={color} style={{ color }}>{color}</span>
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