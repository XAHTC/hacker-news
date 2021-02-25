import cn from "classnames";

import s from "./style.module.css";

const List = ({data}) => {
    const formatTime = (hours, minutes, seconds) => `${hours}:${minutes}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;

    return (
        <>
            {
                data.map(item => {
                    const {url, title, domain, id, time} = item;
                    const date = new Date(time);

                    return <div key={id} className={s.row}>
                        <div
                            className={cn(s.time, s.item)}>{formatTime(date.getHours(), date.getMinutes(), date.getSeconds())}
                        </div>
                        <a href={url} rel={"noreferrer"} target={"_blank"} className={cn(s.title, s.item)}>{title}</a>
                        <a href={`https://${domain}`} rel={"noreferrer"} target={"_blank"}
                           className={cn(s.domain, s.item)}>{domain}</a>
                    </div>
                })
            }
        </>
    )
}

export default List;