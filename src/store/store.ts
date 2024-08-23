import { createStore, applyMiddleware, Store } from 'redux';
import { thunk } from 'redux-thunk'; // Named import
import rootReducer from './reducers'; // Ensure this path is correct

// @ts-ignore
export const store: Store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
