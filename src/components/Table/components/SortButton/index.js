import {useDispatch} from "react-redux";

import {sortByTitle} from "../../../../redux/data";

import {ReactComponent as ArrowSVG} from "./assets/arrow.svg"
import s from "./style.module.css"

const SortButton = () => {
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        dispatch(sortByTitle());
    }

    return (
        <div className={s.button} onClick={handleButtonClick}>
            <ArrowSVG className={s.arrow}/>
        </div>
    )
}

export default SortButton;