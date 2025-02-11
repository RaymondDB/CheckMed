//Aun no implementado

module.exports = function UserDeleted(userId) {
    return {
      type: 'USER_DELETED',
      payload: {
        id: userId
      },
      timestamp: new Date()
    };
  };