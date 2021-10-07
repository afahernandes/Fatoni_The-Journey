import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
  bookmarks: [],
  update: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
        bookmarks: [],
      };
    case "GET_BOOKMARK":
      const bookmark = action.payload;
      const postId = bookmark.map((item) => item.Journeys.id);
      console.log(postId);
      return {
        ...state,
        bookmarks: postId,
      };
    case "ADD_BOOKMARK":
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case "DELETE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((item) => item !== action.payload),
      };
    case "CLEAR_BOOKMARK":
      return {
        ...state,
        bookmarks: [],
      };
    case "UPDATE":
      return {
        ...state,
        update: !state.update,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};
