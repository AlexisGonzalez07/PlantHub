import Auth from "../../utils/auth";

const getSettings = (handleModalOpen, logout) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return [
        {
            name:'SignUp/Login',
            callback: handleModalOpen,
        }
    ];
    } 
    return [
        {
            name: 'Profile',
            callback: null,
            routeTo: '/Profile'
        },
        {
            name:'Dashboard',
            callback: null,
            routeTo: "/mygarden"
        },
        {
            name:'Logout',
            callback: logout,
        },
    ];
}

export default getSettings