import {useHistory} from "react-router-dom";

import s from "./style.module.css"

const BackButton = () => {
    const history = useHistory();

    const handleClickButton = () => {
        history.push("/");
    }

    return (
        <button className={s.button} onClick={handleClickButton}>Back</button>
    )
}

export default BackButton;