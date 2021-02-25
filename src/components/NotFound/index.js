import {useHistory} from "react-router-dom";

import s from "./style.module.css";

const NotFound = () => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push("/");
    }

    return (
        <div className={s.container}>
            <h1>Page not found</h1>
            <button className={s.button} onClick={handleButtonClick}>Back to start</button>
        </div>
    )
}

export default NotFound;