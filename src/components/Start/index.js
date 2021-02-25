import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";

import {setTable} from "../../redux/data";

import s from "./style.module.css";

const Start = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleButtonClick = (table) => {
        history.push("/table");
        dispatch(setTable(table));
    }

    return (
        <div className={s.container}>
            <h1>Choose table</h1>
            <div>
                <button className={s.button} onClick={() => handleButtonClick("news")}>news</button>
                <button className={s.button} onClick={() => handleButtonClick("newest")}>newest</button>
            </div>
        </div>
    )
}

export default Start;