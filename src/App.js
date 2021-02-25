import {Switch, Route, Redirect} from "react-router-dom";

import Start from "./components/Start";
import Table from "./components/Table";
import NotFound from "./components/NotFound";

function App() {
    return (
        <Switch>
            <Route path="/404" component={NotFound}/>
            <Route path="/" exact component={Start}/>
            <Route path="/table" component={Table}/>
            <Route render={() => <Redirect to="/404"/>}/>
        </Switch>
    );
}

export default App;
