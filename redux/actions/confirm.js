export const startConfirmUser = (user) => {
    return {
      type: "START",
      payload: {
        user: user
      },
    };
};

export const endConfirmUser = () => {
    return {
      type: "END",
      payload: {
        user: {}
      },
    };
};