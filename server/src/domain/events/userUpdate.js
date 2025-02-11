//Aun no implementado

module.exports = function UserUpdated(user) {
    return {
      type: 'USER_UPDATED',
      payload: {
        id: user.id,
        updatedFields: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email.address
        }
      },
      timestamp: new Date()
    };
  };