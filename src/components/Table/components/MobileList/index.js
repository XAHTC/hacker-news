import s from "./style.module.css"

const MobileList = ({data}) => {
    return (
        <>
            {
                data.map(item => <a key={item.title} href={item.url} rel={"noreferrer"} target={"_blank"}
                                    className={s.item}>{item.title}</a>)
            }
        </>
    )
}

export default MobileList;