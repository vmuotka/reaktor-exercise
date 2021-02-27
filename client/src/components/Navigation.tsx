import { FC } from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
  children?: JSX.Element
}

const categories = [
  'gloves', 'beanies', 'facemasks'
]


const Navigation: FC<Props> = (props: Props) => {
  // const [location, setLocation] = useState('')

  return (
    <div className='grid relative' style={{
      gridTemplateAreas: `
      "header header" 
      "nav content"
      `,
      gridTemplateColumns: '1fr 8fr'
    }}>
      <div
        style={{ gridArea: 'header' }}
        className='w-full h-full bg-primary-400 text-white text-xl text-center p-3'
      >
        ReaktorStyles
      </div>
      <div
        style={{ gridArea: 'nav' }}
        className='w-full h-screen sticky top-0 bg-secondary-400'
      >
        <ul className='divide-y'>
          <li
            className={`text-lg text-gray-600 text-center font-medium hover:bg-secondary-300 border-secondary-400 pointer`}
          >
            <NavLink className='w-full block px-4 py-1 capitalize' activeClassName='bg-secondary-300' exact to='/' >Home</NavLink>
          </li>
          {categories.map(category =>
            <li
              key={category}
              className={`text-lg text-gray-600 text-center font-medium hover:bg-secondary-300 border-secondary-400 pointer`}
            >
              <NavLink className='w-full block px-4 py-1 capitalize' activeClassName='bg-secondary-300' exact to={`/category/${category}`} >{category}</NavLink>
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