import { configureStore } from '@reduxjs/toolkit';
import apiServices from './apiServices';
import languageReducer from '../features/reduxSlices/languageSlice';
import typeActionReducer from '../features/reduxSlices/typeActionSlice';
import categoryActionReducer from '../features/reduxSlices/categoryActionSlice'
import datapassOneReducer from '../features/reduxSlices/participateSlice'
import languageidReducer from '../features/reduxSlices/languageIdSlice'
import datapassTwoReducer from '../features/reduxSlices/passDataTwo'
import imgApiServices from './imgApiServices';
import imgIdSliceReducer from '../features/reduxSlices/imgIdSlice'
import actionReducer from '../features/reduxSlices/postSlice'
import blogReducer from '../features/reduxSlices/postBlogSlice'
import autreReducer from '../features/reduxSlices/AutreSlice'
const store = configureStore({
  reducer: {
    [apiServices.reducerPath]: apiServices.reducer,
    [imgApiServices.reducerPath]: imgApiServices.reducer,

    language: languageReducer,
    typeAction:typeActionReducer,
    categoryAction:categoryActionReducer,
    datapassOne:datapassOneReducer,
    languageid:languageidReducer,
    datapassTwo:datapassTwoReducer,
    imgIdSlice:imgIdSliceReducer,
    action:actionReducer,
    blog:blogReducer,
    autre:autreReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiServices.middleware,imgApiServices.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;