const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      alert: null,
      token: sessionStorage.getItem('token') || null,
      posts: []
    },
    actions: {
      login: async (credentials) => {
        const { throwAlert } = getActions();

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
          });

          const data = await response.json();

          if (response.ok) {
            setStore({ 'token': data.token })
            sessionStorage.setItem('token', data.token)
            throwAlert('Login successful', true);
            return true;
          }
          else {
            throwAlert(data.message, false);
            return false;
          }
        }
        catch (exception) {
          console.log(exception)
          return false
        }
      },
      logOut: () => {
        const { throwAlert } = getActions();

        sessionStorage.removeItem('token');
        setStore({ 'token': null });
        throwAlert('Logged out successful', true)
      },
      throwAlert: (message, type) => {
        let newAlert = null;

        if (message != null && type != null) {
          newAlert = {
            message: message,
            type: type
          }
        }

        setStore({
          'alert': newAlert
        });
      },
      signUp: async (credentials) => {
        const { throwAlert } = getActions();

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          });

          const data = await response.json();

          if (response.ok) {
            throwAlert('User created successful', true);
          }
          else {
            throwAlert(data.message, false);
          }

        }
        catch (error) {
          console.log(error);
          throwAlert('Some critical error ocurred', false);
        }
      },
      loadPost: async () => {
        const { token } = getStore()
        const { throwAlert } = getActions();

        if (token == null) {
          setStore({ 'posts': null })
          setStore({ 'token': null })
          history.pushState(null, '', '/denied');
          return null;
        }

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/post`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const data = await response.json();
          if (response.status == 401) {
            throwAlert(data.msg, false);
            setStore({ 'posts': null })
            setStore({ 'token': null })
            return null;
          }

          setStore({ 'posts': data })
        }
        catch (error) {
          console.log(error);
        }

      }
    }
  };
};

export default getState;
