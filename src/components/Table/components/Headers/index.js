import {useState} from "react";
import {useDispatch} from "react-redux";

import cn from "classnames";

import {sortByDomain, sortByTime, sortByTitle} from "../../../../redux/data";

import {ReactComponent as ArrowSVG} from "./assets/arrow.svg";
import s from "./style.module.css"

const Headers = ({headers}) => {
    const dispatch = useDispatch();
    const [sortedTime, setSortedTime] = useState(false);
    const [sortedTitle, setSortedTitle] = useState(false);
    const [sortedDomain, setSortedDomain] = useState(false);

    const [active, setActive] = useState(null);

    const handleSortClick = (idx) => {
        switch (idx) {
            case 0:
                sortTime(idx);
                break;
            case 1:
                sortTitle(idx);
                break;
            case 2:
                sortDomain(idx);
                break;
            default:
                break;
        }
    }

    const sortTime = (idx) => {
        setActive(idx);
        dispatch(sortByTime(sortedTime));
        setSortedTime(!sortedTime);
    }

    const sortTitle = (idx) => {
        setActive(idx);
        dispatch(sortByTitle(sortedTitle));
        setSortedTitle(!sortedTitle);
    }

    const sortDomain = (idx) => {
        setActive(idx);
        dispatch(sortByDomain(sortedDomain));
        setSortedDomain(!sortedDomain);
    }

    return (
        <div className={s.headers}>
            {
                headers.map((header, idx) => <div className={s.header}
                                                  key={idx}>{header}
                    <ArrowSVG className={cn(s.arrow, {
                        [s.reverse]: idx === active,
                    })} onClick={() => handleSortClick(idx)}/>
                </div>)
            }
        </div>
    )
}

export default Headers;