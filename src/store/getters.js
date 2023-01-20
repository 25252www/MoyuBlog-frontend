const getters = {
    token: state => state.user.token,
    username: state => state.user.username,
    role: state => state.user.role,
    avatar: state => state.user.avatar,
    phone: state => state.user.phone
}

export default getters
