const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    userId: state => state.user.id,
    username: state => state.user.username,
    roles: state => state.user.roles,
    avatar: state => state.user.avatar,
    phone: state => state.user.phone
}

export default getters
