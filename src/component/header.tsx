import { NavLink } from 'react-router-dom'

const Header = () => {
  
  return (
    <div className='flex gap-5 mt-10 w-[90%] mx-auto'>
        <NavLink to='/' className={({isActive})=>{return isActive ? 'bg-[aqua] p-4 rounded-xl' : 'p-4 rounded-xl'}}>Health</NavLink>

    </div>
  )
}

export default Header