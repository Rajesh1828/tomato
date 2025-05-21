import React, { useEffect } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const url = "https://tomato-backend-0h8d.onrender.com"
  const [list, setList]= React.useState([]);

  const fetchList = async()=>{

    const response = await axios.get(`${url}/api/food/all`);
    // console.log(response.data);
    
    if(response.data.success){
      setList(response.data.data)
    }
else{
  toast.error(response.data.message);
}
  }

  //removing the food items
  const removeItem = async(id)=>{
 const response = await axios.delete(`${url}/api/food/remove/${id}`)
 await fetchList();

    
  }
  useEffect(() => {
    fetchList();
  }, [])


  return (
    <div className='list add flex-col'>
      <p>FoodList</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Description</p>
          <p>Image</p>
          <p>Action</p>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div  key={index} className="list-table-format">
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p>{item.description}</p>
                <img src={`${url}/images/${item.image}`} alt="" />
                <p onClick={()=>removeItem(item._id)} className='delete'> X</p>

              
              </div>
            )
          })
        }
      </div>


    </div>
  )
}

export default List
