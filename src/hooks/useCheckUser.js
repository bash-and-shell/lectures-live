import { useState, useEffect } from 'react';
import axios from 'axios';

const useCheckUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      await axios.get('/users/checkUser')
        .then(res => {
          setUser(res.data.currentUser);
        }).catch(err => {
          console.error(err);
        });
    }
    checkUser();
  }, []);

  return { user, setUser };
}

export default useCheckUser;