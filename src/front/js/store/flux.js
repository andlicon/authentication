const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      alert: null,
      token: sessionStorage.getItem('token') || null,
      posts: JSON.parse(sessionStorage.getItem('posts')) || [],
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
            return true;
          }
          else {
            throwAlert(data.message, false);
          }
        }
        catch (error) {
          console.log(error);
          throwAlert('Some critical error ocurred', false);
        }

        return false;
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
          let response = await fetch(`${process.env.BACKEND_URL}/post`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const postData = await response.json();

          if (!response.ok) {
            throwAlert(postData.msg, false);
            setStore({ 'posts': null })
            setStore({ 'token': null })
            return null;
          }

          for (let i = 0; i < postData.length; i++) {
            const user_id = postData[i]['user_id'];
            const response = await fetch(`${process.env.BACKEND_URL}/user/${user_id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            const userData = await response.json();
            postData[i]['user_nickname'] = userData.nickname;
          }

          setStore({ 'posts': postData })
          sessionStorage.setItem('posts', JSON.stringify(postData))
        }
        catch (error) {
          console.log(error);
          throwAlert(error.msg, false);
          setStore({ 'posts': null })
          setStore({ 'token': null })
        }
      },

      submitPost: async (post) => {
        const { token } = getStore()
        const { throwAlert } = getActions();

        try {
          const response = await fetch(`${process.env.BACKEND_URL}/post`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
          });

          const data = await response.json();

          if (!response.ok) {
            throwAlert(data.message, false);
            return null;
          }

          throwAlert('Post created successfully', true);
          return data;
        }
        catch (error) {
          console.log(error);
          throwAlert(error.message, false);
          return null;
        }
      },

      getOnePost: (postId) => {
        const { posts } = getStore();

        const post = posts.filter(element => {
          return element.id == postId
        });

        return post.length > 0 ? post[0] : null;
      }

    }
  };
};

export default getState;
