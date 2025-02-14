//Aun no implementado

module.exports = function UserDeleted(userId) {
    return {
      type: 'USER_DELETED',
      payload: {
        id: user.id
      },
      timestamp: new Date()
    };
  };