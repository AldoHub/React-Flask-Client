import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Main = () => {

    const [items, setItems] = useState([]);

    function getItems(){
        fetch("http://localhost:5000/api/items")
        .then(res => {
            return res.json();
        }).then(items => {
          console.log(items);
            setItems(items.data);
            
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getItems();
    }, []);
    


    let itemsArray;
    if(items.length > 0){
        itemsArray = <div className="items">
                        {items.map(item => {
                            return(
                                <div className="item" key={item._id}>
                                 <Link to={"item/" + item._id}>
                                    <div className="cover" style={{backgroundImage: "url(" + item.image + ")" }}></div>
                                 </Link>
                                <p className="name">{item.name}</p>
                                </div>
                            )
                        })}

                     </div>
    }else{
        itemsArray = <div className="message">
                        <p>No  items in the database</p>
                     </div>
    }

    return(
        <React.Fragment>
            <header>
                <h1>React Flask <br/> Items</h1>
                <p>Powered by React / Hooks / Flask</p>
            </header>
           
            {itemsArray}
        </React.Fragment>
    )
}

export default Main;