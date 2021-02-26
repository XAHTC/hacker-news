import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import Headers from "./components/Headers";
import List from "./components/List";
import MobileHeader from "./components/MobileHeader";
import BackButton from "./components/BackButton";
import MobileList from "./components/MobileList";
import SortButton from "./components/SortButton";
import Loading from "./components/Loading";

import {getDataAsync, loadDataAsync, selectDataData, selectDataFetching, selectDataTable} from "../../redux/data";

import s from "./style.module.css";

const headers = ["Time added", "Title", "Domain"];

const Table = () => {
    const [page, setPage] = useState(2);
    const history = useHistory();
    const dispatch = useDispatch();
    const isFetching = useSelector(selectDataFetching);
    const data = useSelector(selectDataData);
    const table = useSelector(selectDataTable);
    const checkTable = table === "";

    if (checkTable) {
        history.replace("/");
    }

    useEffect(() => {
        if (!checkTable) {
            dispatch(getDataAsync(table));
        }
    }, [dispatch, table, checkTable])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.onbeforeunload = () => window.scrollTo(0, 0);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop > document.scrollingElement.scrollHeight - 1) {
            setPage(page => page + 1);
            dispatch(loadDataAsync(page, table));
        }
    }

    if (isFetching) {
        return (
            <>
                <Loading/>
                <BackButton/>
            </>
        )
    }

    return (
        <div className={s.container}>
            {
                <>
                    <Headers headers={headers}/>
                    <List data={data}/>
                    <BackButton/>
                    <MobileHeader/>
                    <MobileList data={data}/>
                    <SortButton />
                </>
            }
        </div>
    )
}

export default Table;