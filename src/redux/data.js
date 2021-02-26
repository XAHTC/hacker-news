import {createSlice} from "@reduxjs/toolkit";
import {uniqBy} from "lodash";

export const slice = createSlice({
    name: 'data',
    initialState: {
        isFetching: false,
        data: [],
        table: "",
        error: null,
    },
    reducers: {
        setTable: (state, action) => ({
            ...state,
            table: action.payload,
        }),
        fetchData: state => ({
            ...state,
            isFetching: true,
        }),
        fetchDataResolve: (state, action) => ({
            ...state,
            isFetching: false,
            data: action.payload,
        }),
        loadDataResolve: (state, action) => {
            //fetched data sometimes come with same id's then it make a problem with map()
            const assignedData = [...state.data,
                ...action.payload];
            const uniqueData = uniqBy(assignedData, "id");
            return {
                ...state,
                data: [
                    ...uniqueData
                ]
            }
        },
        sortByTime: (state, action) => {
            const newData = [...state.data];
            if (!action.payload) {
                newData.sort((a, b) => b.time - a.time);
                return {
                    ...state,
                    data: newData,
                }
            } else {
                newData.reverse();
                return {
                    ...state,
                    data: newData,
                }
            }
        },
        sortByTitle: (state, action) => {
            const newData = [...state.data];
            if (!action.payload) {
                newData.sort((a, b) => a.title.localeCompare(b.title));
                return {
                    ...state,
                    data: newData,
                }
            } else {
                newData.reverse();
                return {
                    ...state,
                    data: newData,
                }
            }

        },
        sortByDomain: (state, action) => {
            const newData = [...state.data];
            if (action.payload) {
                newData.sort((a, b) => a.domain.localeCompare(b.domain));
                return {
                    ...state,
                    data: newData,
                }
            } else {
                newData.reverse();
                return {
                    ...state,
                    data: newData,
                }
            }
        }
    }
});

export const {
    fetchData,
    fetchDataResolve,
    loadDataResolve,
    sortByTime,
    sortByTitle,
    sortByDomain,
    setTable
} = slice.actions;

export const selectDataFetching = state => state.data.isFetching;
export const selectDataData = state => state.data.data;
export const selectDataTable = state => state.data.table;


export const getDataAsync = (table) => async (dispatch) => {
    dispatch(fetchData());
    const data = await fetch(`https://api.hnpwa.com/v0/${table}/1.json`).then(res => res.json());
    const filteredData = data.map(item => {
        const domain = item.domain ? item.domain : "NOT FOUND";
        return {
            ...item,
            domain: domain,
        }
    })
    dispatch(fetchDataResolve(filteredData));
}

export const loadDataAsync = (page, table) => async (dispatch) => {
    const data = await fetch(`https://api.hnpwa.com/v0/${table}/${page}.json`).then(res => res.json());
    const filteredData = data.map(item => {
        const domain = item.domain ? item.domain : "NOT FOUND";
        return {
            ...item,
            domain: domain,
        }
    });
    dispatch(loadDataResolve(filteredData));
}

export default slice.reducer;