import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Headers from "./components/Headers";
import List from "./components/List";
import MobileHeader from "./components/MobileHeader";
import BackButton from "./components/BackButton";
import MobileList from "./components/MobileList";
import SortButton from "./components/SortButton";

import {getDataAsync, loadDataAsync, selectDataData, selectDataFetching, selectDataTable} from "../../redux/data";

import s from "./style.module.css";
import Loading from "./components/Loading";;

const headers = ["Time added", "Title", "Domain"];

const Table = () => {
    const [page, setPage] = useState(2);

    const dispatch = useDispatch();
    const isFetching = useSelector(selectDataFetching);
    const data = useSelector(selectDataData);
    const table = useSelector(selectDataTable);

    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        dispatch(getDataAsync(table));
    }, [dispatch, table])


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
        return <Loading />
    }

    return (
        <div className={s.container}>
            {
                !isMobile ? (
                    <>
                        <Headers headers={headers}/>
                        <List data={data}/>
                        <BackButton />
                    </>
                ) : (
                    <>
                        <MobileHeader/>
                        <MobileList data={data}/>
                        <SortButton/>
                        <BackButton />
                    </>
                )
            }
        </div>
    )
}

export default Table;