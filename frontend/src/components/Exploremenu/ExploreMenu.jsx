import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
 
  return (
    <div className='exploreMenu' id="explore">
      <h1>Explore Our Name</h1>
      <p className='explore-Menu-Text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores officiis culpa quia at, amet aliquam?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error, quam?</p>
      <div className="explore-menu-list">
        {
          menu_list.map((item, index) => {
            return (<div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>

            </div>)
          })
        }
      </div>  
      <hr />

    </div>
  )
}

export default ExploreMenu