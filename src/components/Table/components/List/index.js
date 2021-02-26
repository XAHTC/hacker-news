import cn from "classnames";

import s from "./style.module.css";

const List = ({data}) => {
    const formatTime = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
        const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <>
            {
                data.map(item => {
                    const {url, title, domain, id, time} = item;
                    const date = new Date(time);
                    return <div key={id} className={s.row}>
                        <div
                            className={cn(s.time, s.item)}>{formatTime(date)}
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