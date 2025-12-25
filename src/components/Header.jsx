import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const Header = () => {
    const { t, i18n } = useTranslation()
      const changeLanguage = (e) => {
      const lng = e.target.value
      i18n.changeLanguage(lng)
      localStorage.setItem('lang', lng)
    }
  return (


    <div className="
      flex justify-between items-center px-10 py-6 
      bg-gradient-to-r from-black via-gray-800 to-black
      shadow-lg shadow-red-900/40 border-b border-red-500/20
    ">
      
      
      {/* Logo */}
      <h1 className="
        text-4xl font-extrabold tracking-wide
        bg-gradient-to-r from-red-500 via-yellow-400 to-red-600   
        bg-clip-text text-transparent 
        drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]
      ">
        {t('MyMovie')}
      </h1>


      {/* Navigation */}
      <nav>
        <ul className="flex gap-12 text-xl font-medium items-center">
          
          <li>
            <NavLink 
              to="/"
              className={({ isActive }) =>
                `transition duration-300 
                ${isActive 
                  ? "text-red-400 drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]" 
                  : "text-gray-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"}
                `
              }
            >
              {t('home')}
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/cinema"
              className={({ isActive }) =>
                `transition duration-300 
                ${isActive 
                  ? "text-red-400 drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]" 
                  : "text-gray-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"}
                `
              }
            >
              {t('cinema')}
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/savings"
              className={({ isActive }) =>
                `transition duration-300 
                ${isActive 
                  ? "text-red-400 drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]" 
                  : "text-gray-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"}
                `
              }
            >
              {t('Savings')}
            </NavLink>
          </li>
            
           

          <li>
            <NavLink 
              to="/paketlar"
              className={({ isActive }) =>
                `transition duration-300 
                ${isActive 
                  ? "text-red-400 drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]" 
                  : "text-gray-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"}
                `
              }
            >
              {t('subscription')}

            </NavLink>
          </li>

          <li>
            <select value={i18n.language}
              onChange={changeLanguage}
              className="border border-white bg-transparent text-white rounded p-1">
              <option value="uz" className='bg-blue-900 text-white'>Uz</option>
              <option value="ru" className='bg-blue-900 text-white'>Ru</option>
              <option value="en" className='bg-blue-900 text-white'>En</option>
            </select>
          </li>
        </ul>
      </nav>

    </div>
  )
}

export default Header


