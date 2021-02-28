import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'

import ArrowLeft from './icons/ArrowLeft'
import ArrowRight from './icons/ArrowRight'

interface Props {
  children?: JSX.Element
}

const categories = [
  'gloves', 'beanies', 'facemasks'
]


const Navigation: FC<Props> = (props: Props) => {
  const [showNav, setShowNav] = useState(true)
  return (
    <div className='grid relative' style={{
      gridTemplateAreas: showNav ? `
        "navbtn header" 
        "nav content"
        ` : `
        "navbtn header" 
        "content content"
      `,
      gridTemplateColumns: '1fr 8fr'
    }}>
      <div
        style={{ gridArea: 'navbtn' }}
        className='w-full h-full bg-primary-400 text-center'
      >
        <button
          onClick={() => setShowNav(!showNav)}
          className='w-full h-full flex justify-center items-center focus:outline-none'
        >
          {showNav ? <ArrowLeft className='h-8' /> : <ArrowRight className='h-8' />}
        </button>
      </div>
      <div
        style={{ gridArea: 'header' }}
        className='w-full h-full bg-primary-400 text-white text-xl text-center p-3'
      >
        ReaktorStyles
      </div>
      <div
        style={{ gridArea: 'nav' }}
        className={`w-full h-screen sticky top-0 bg-secondary-400 ${!showNav && 'hidden'}`}
      >
        <ul className='divide-y'>
          <li
            className={`text-lg text-gray-600 text-center font-medium hover:bg-secondary-300 border-secondary-400 pointer`}
          >
            <NavLink className='w-full block px-6 py-1 capitalize' activeClassName='bg-secondary-300' exact to='/' >Home</NavLink>
          </li>
          {categories.map(category =>
            <li
              key={category}
              className={`text-lg text-gray-600 text-center font-medium hover:bg-secondary-300 border-secondary-400 pointer`}
            >
              <NavLink className='w-full block px-6 py-1 capitalize' activeClassName='bg-secondary-300' exact to={`/category/${category}`} >{category}</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div style={{ gridArea: 'content' }}>
        {props.children}
      </div>
    </div>
  )
}

export default Navigation