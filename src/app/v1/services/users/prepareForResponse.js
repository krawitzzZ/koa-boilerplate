export default user => ({
    id: user.id,
    login: user.login,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
