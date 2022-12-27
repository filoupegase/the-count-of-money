import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
    configureStore,
    createListenerMiddleware,
    TypedStartListening,
    TypedAddListener,
    ListenerEffectAPI,
    addListener,
} from '@reduxjs/toolkit'
import { authSlice } from './services/auth/slice';
import { userSlice } from './services/user/slice';
import { cryptoSlice } from "./services/crypto/slice";
import { registerSlice } from "./services/register/slice";
import { userUpdateSlice } from "./services/userUpdate/slice";


const listenerMiddlewareInstance = createListenerMiddleware({
    onError: () => console.error,
})

const store = configureStore({
    reducer: {
        [userUpdateSlice.name]: userUpdateSlice.reducer,
        [authSlice.name]: authSlice.reducer,
        [registerSlice.name]: registerSlice.reducer,
        [userSlice.name]: userSlice.reducer,
        [cryptoSlice.name]: cryptoSlice.reducer
    },
    middleware: (gDM) => gDM().prepend(listenerMiddlewareInstance.middleware),
});

export { store }

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>
export type AppAddListener = TypedAddListener<RootState, AppDispatch>
export const startAppListening = listenerMiddlewareInstance.startListening as AppStartListening
export const addAppListener = addListener as AppAddListener

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;