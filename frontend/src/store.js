import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from "redux-devtools-extension";
import {
  articleCreateReducer,
  articleDeleteReducer,
  articleListReducer,
  articleUpdateReducer,
  articleDisplayReducer,
  articleLikeReducer,
  articleCommentReducer,
} from "./reducers/articlesReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userListReducer,
} from "./reducers/userReducers";

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  articleList: articleListReducer,
  userLogin: userLoginReducer,
  articleDisplay: articleDisplayReducer,
  userRegister: userRegisterReducer,
  articleCreate: articleCreateReducer,
  articleDelete: articleDeleteReducer,
  articleUpdate: articleUpdateReducer,
  articleLike: articleLikeReducer,
  articleComment: articleCommentReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
});

const userInfoFromStorage = localStorage.getItem("token");

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  persistReducer(persistConfig, reducer),
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export const persistor = persistStore(store)
