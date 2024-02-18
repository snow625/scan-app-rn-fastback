import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authReducer";
import webSitesSlice from "./webSites/webSitesReducer";

// Persist
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "token",
    storage: AsyncStorage,
    whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, authSlice);

const rootReducer = combineReducers({
    auth: persistedReducer,
    webSides: webSitesSlice,
});

export default rootReducer;
