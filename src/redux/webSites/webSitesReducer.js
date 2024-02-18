import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    result: {},
};

const webSideSlice = createSlice({
    name: "webSides",
    initialState,
    reducers: {
        addWebSidesResult: (store, { payload }) => {
            const { name } = payload;
            return { ...store, result: { ...store.result, [name]: payload } };
        },
        removeWebSidesResult: (store, { payload }) => {
            const { name } = payload;
            const newRes = Object.keys(store.result).reduce((acc, key) => {
                if (key !== name) acc[key] = store.result[key];
                return acc;
            }, {});

            return { ...store, result: newRes };
        },
    },
});

export const { addWebSidesResult, removeWebSidesResult } = webSideSlice.actions;

export default webSideSlice.reducer;
