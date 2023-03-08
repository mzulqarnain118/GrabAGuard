const allRoles = {
  hirer: ['getUsers', 'manageUsers'],
  guard: ['getUsers', 'manageUsers'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
