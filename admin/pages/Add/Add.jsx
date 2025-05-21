import React from 'react'
import './Add.css'
import { assets } from '../../src/assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';


const Add = () => {

    const [image , setImage] = React.useState(false)
    const [data,setData] = React.useState({
        name:"",
        description:"",
        category:"salad",
        price:""
    })

    const url = "https://tomato-backend-0h8d.onrender.com"


    const  onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData(data=>({...data,[name]:value}))
    }
    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("price",data.price)
        formData.append("image",image)
    
 const response = await axios.post(`${url}/api/food/add`,formData)
 
 if(response.data.success){
    setData({
        name:"",
        description:"",
        category:"salad",
        price:""
    })
    setImage(false)
    toast.success(response.data.message);
}
else{
    toast.error(response.data.message);
}
    
 }

  return (
    <div className='add'>
        <form onSubmit={onSubmitHandler} className='flex-col'>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="file">
                    <img src={image?URL.createObjectURL(image): assets.upload_area} alt=""/>
                </label>
                <input onChange={imageHandler} type="file" id="file" hidden />
            </div>

            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input  onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Product Name' />
            </div>

            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} type="text" name='description' rows="5" placeholder='Product Description' />
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p> product-Category</p>
                    <select onChange={onChangeHandler} value={data.category} name='category'>
                        <option value="salad">salad </option>
                        <option value="Rolls"> Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwiches">Sandwiches</option>
                        <option value="Cake">cake</option>
                        <option value="Pure-veg"> Pure-veg</option>
                        <option value="Veg">Veg</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Pasta">Pasta</option>

                    </select>
                </div>
            </div>

            <div className="add-price flex-col">
                <p>Product-Price</p>
                <input  onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$Price' required />
            </div>
            <button type='submit' className='add-btn'> Add</button>
        
        </form>

    </div>
  )
}

export default Add
