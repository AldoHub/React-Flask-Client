import React, {useEffect, useState} from "react";
import defaultImage from "../assets/placeholder-600x400.png"; 

const Create = () => {

   const [productName, setproductName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [image, setImage] = useState("");


   const createItem = (e) =>{
       e.preventDefault();

       const item = {
        name : productName,
        description :  description,
        image: image,
        amount: price
       }

       const options = { 
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
           body: JSON.stringify(item)
       } 

       if(description && image && productName && price ){
            fetch("http://localhost:5000/api/create", options)
            .then(res => {
                //response must be parsed to JSON format
                return res.json();
            }).then(res => {
                console.log(res)
                
            })
        }else {
            console.log("The form is not valid to be sent")
        }
   }


   const isImgReady = image;
   let imagePreview;

   if(isImgReady) {
     imagePreview = <img className="preview" src={image} alt="product "/>
   }else {
     imagePreview = <img className="preview" src={defaultImage} alt="default preview"/>
   }



    return(
        <React.Fragment>
         

            <form className="create" onSubmit={createItem}>
            <h2>Create a new item</h2>
            <div className="control">
                <label htmlFor="name">Product Name: </label>
                <input type="text" name="name" onChange={e => setproductName(e.target.value)} />
                </div>

                <div className="control">
                <label htmlFor="description">Product Description: </label>
                <textarea name="description" onChange={e => setDescription(e.target.value)} ></textarea>
                </div>

                <div className="control">
                <label htmlFor="price">Product Price: </label>
                <input type="number" name="price" onChange={e => setPrice(e.target.value)} />
                </div>
                
                <div className="control">
                <label htmlFor="image">Product Image: </label>
                <input type="text" name="image" onChange={e => setImage(e.target.value)} />
                </div>
                
                <input type="submit" value="create post" />
            </form>

            {imagePreview}

        </React.Fragment>
    )
}

export default Create;