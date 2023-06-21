const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      alert: null,
      token: sessionStorage.getItem('token') || null
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
      signIn: event => {
        console.log('Sign In');
      }
    }
  };
};

export default getState;
