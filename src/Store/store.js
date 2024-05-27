import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import homeReducer from '../Reducer/homeReducer';

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, combineReducers({ home: homeReducer}))

const store = configureStore({
  reducer: {
    persistedReducer
  },
})
const persistor = persistStore(store)
export {store,persistor}