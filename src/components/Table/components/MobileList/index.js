import s from "./style.module.css"

import Truncate from 'react-truncate';

const MobileList = ({data}) => {
    const handleClick = (url) => {
        console.log(url);
        window.open(url)
    }
    return (
        <>
            {
                data.map(item => <Truncate key={item.id} className={s.item} lines={2}
                                           ellipsis={"..."}
                                           onClick={() => handleClick(item.url)}>
                    {item.title}
                </Truncate>)
            }
        </>
    )
}

export default MobileList;