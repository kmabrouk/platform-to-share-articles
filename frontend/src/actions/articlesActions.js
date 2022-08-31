import {
  ARTICLES_CREATE_FAIL,
  ARTICLES_CREATE_REQUEST,
  ARTICLES_CREATE_SUCCESS,
  ARTICLES_DELETE_FAIL,
  ARTICLES_DELETE_REQUEST,
  ARTICLES_DELETE_SUCCESS,
  ARTICLES_LIST_FAIL,
  ARTICLES_LIST_REQUEST,
  ARTICLES_LIST_SUCCESS,
  ARTICLES_UPDATE_FAIL,
  ARTICLES_UPDATE_REQUEST,
  ARTICLES_UPDATE_SUCCESS,
  DISPLAY_ARTICLE_REQUEST,
  DISPLAY_ARTICLE_SUCCESS,
  DISPLAY_ARTICLE_FAIL,
} from "../constants/articlesConstants";
import axios from "axios";

export const listArticles = () => async (dispatch) => {
  try {
    dispatch({
      type: ARTICLES_LIST_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("token")}`,
      },
    };

    const { data } = await axios.get(`/api/articles`, config);

    dispatch({
      type: ARTICLES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ARTICLES_LIST_FAIL,
      payload: message,
    });
  }
};

export const DisplayArticleAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DISPLAY_ARTICLE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("token")}`,
      },
    };

    const { data } = await axios.get(`/api/articles/${id}`, config);

    dispatch({
      type: DISPLAY_ARTICLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DISPLAY_ARTICLE_FAIL,
      payload: message,
    });
  }
};

export const createArticleAction =
  (title, content, category, pic, likeCount) => async (dispatch) => {
    try {
      dispatch({
        type: ARTICLES_CREATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
      };

      const { data } = await axios.post(
        `/api/articles/create`,
        { title, content, category, pic, likeCount },
        config
      );

      dispatch({
        type: ARTICLES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ARTICLES_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteArticleAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTICLES_DELETE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("token")}`,
      },
    };

    const { data } = await axios.delete(`/api/articles/${id}`, config);

    dispatch({
      type: ARTICLES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ARTICLES_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateArticleAction =
  (id, title, content, category, pic, likeCount) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ARTICLES_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
      };

      const { data } = await axios.put(
        `/api/articles/${id}`,
        { title, content, category, pic, likeCount },
        config
      );

      dispatch({
        type: ARTICLES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ARTICLES_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const likeArticle = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${localStorage.getItem("token")}`,
      },
    };

    await axios.patch(`/api/articles/${id}/likeArticle`, config);
  } catch (error) {
    console.log(error);
  }
};

export const commentArticle = async (value, id, userId) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put(
      `/api/articles/${id}/commentArticle`,
      {
        text: value,
        userId: userId,
      },
      config
    );
  } catch (error) {
    console.log(error);
  }
};
