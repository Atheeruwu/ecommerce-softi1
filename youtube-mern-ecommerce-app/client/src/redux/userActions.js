import axios from 'axios';

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });

    const { data } = await axios.post('/api/users/login', {
      username,
      password,
    });

    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/api/users/logout');
    dispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
    document.location.href = '/login';
  } catch (error) {
    console.log(error);
  }
};
