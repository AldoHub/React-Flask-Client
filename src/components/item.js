import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";

const Item = (props) => {
    const [item, setItem] = useState({});
    const [itemid, setItemid] = useState("");
    const [editMode, setEditMode] = useState(false);
    //item
    const [productName, setproductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [routeRedirect, setRedirect] = useState("");   

   function getItem(){
        //we need to remove the quotes
        // in order to search for the item in pymongo
        let id = props.match.params.id;
        let cleanId = id.replace(/['"]+/g, '');
        setItemid(cleanId)
        fetch("http://localhost:5000/api/item/" + cleanId)
        .then(res => {
            return res.json();
        }).then(response => {
            //parse the pymongo response to JSON
            let parsedResponse = JSON.parse(response.data);
            setItem(parsedResponse)

            //set form values
            setproductName(parsedResponse.name);
            setDescription(parsedResponse.description);
            setPrice(parsedResponse.amount);
            setImage(parsedResponse.image);



        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getItem();
    }, []);

    const editItem = (itemId) => {
        console.log(itemId)
        setEditMode(!editMode);
    }


    const updateItem = (e) => {
        e.preventDefault();
        const item = {
            itemid: itemid,
            name : productName,
            description : description,
            image: image,
            amount: price
          }

          console.log(item)
          const options = { 
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
               body: JSON.stringify(item)
          
          }
          
          fetch("http://localhost:5000/api/update/"+ itemid, options)
          .then(res => {
              return res.json();
             
          }).then(res => {
              console.log(res)
               setRedirect(true);
          }).catch(err => {
              console.log(err)
          });

    }

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }
    

    const deleteItem = (itemid) => {
        const options = { 
            method: 'delete',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: itemid})
          } 
          fetch("http://localhost:5000/api/delete/"+ itemid , options)
          .then(res => {
            return res.json()
           })
           .then(res => {
               console.log(res);
               setRedirect(true);
           }).catch(err => {
               console.log(err)
           })
    }
    
    let editForm;
    if(editMode){
        editForm =<React.Fragment>
                    <form className="editForm" onSubmit={updateItem}>
                    <p>Update the item values below:</p>
                    <div className="control">
                        <label htmlFor="name">Product Name: </label>
                        <input type="text" name="name"  onChange={e => setproductName(e.target.value)} defaultValue={item.name} />
                        </div>

                        <div className="control">
                        <label htmlFor="description">Product Description: </label>
                        <textarea name="description" onChange={e => setDescription(e.target.value)} defaultValue={item.description} >
                        </textarea>
                        </div>

                        <div className="control">
                        <label htmlFor="price">Product Price: </label>
                        <input type="number" name="price" onChange={e => setPrice(e.target.value)} defaultValue={item.amount} />
                        </div>
                        
                        <div className="control">
                        <label htmlFor="image">Product Image: </label>
                        <input type="text" name="image" onChange={e => setImage(e.target.value)} defaultValue={item.image} />
                        </div>
                        
                        <input type="submit" value="Update Item" />
                    </form>



                    <button className="delete" onClick={(e) => deleteItem(itemid)}>Delete Item</button>
                    </React.Fragment>
    }


  return (
    <React.Fragment>
        <div className="single">
            <img src={item.image} />   
            <div>
                <h2>{item.name}</h2>
                <span>&#x24;{item.amount}</span>
                <br/>
                <p>{item.description}</p>
              
                <button className="edit" onClick={(e) => editItem(itemid)}>Edit Item</button>
            </div>
        </div>

        {editForm}
      
    </React.Fragment>
  );
}

export default Item;
