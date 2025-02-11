//Aun no implementado

module.exports = function UserCreated(user) {
    return {
      type: 'USER_CREATED',
      payload: {
        id: user.id,
        email: user.email.address,
        name: `${user.firstName} ${user.lastName}`
      },
      timestamp: new Date()
    };
  };