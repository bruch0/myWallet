const storeUser = ({ user }) => {
  localStorage.setItem('user', user);
};

const getUser = () => localStorage.getItem('user');

const removeUser = () => localStorage.removeItem('user');

export { storeUser, getUser, removeUser };
