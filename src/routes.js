import React from "react";
import { Switch, Route} from "react-router-dom";

//import the components
import Main from "./components/main";
import Create from "./components/create";
import Item from "./components/item";

const Routes = () => (
   
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/item/:id" component={Item} />
         
        </Switch>
       
) 

export default Routes;