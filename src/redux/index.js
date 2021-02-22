import { createStore } from 'redux'
import rootReducer from './reducers/index'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'demo',
    storage,
}
  
const persistedReducer = persistCombineReducers(persistConfig, rootReducer)

const store = createStore(persistedReducer)
export const persistor = persistStore(store)
  
export default store