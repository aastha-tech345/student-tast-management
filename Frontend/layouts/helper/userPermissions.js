const permissions = {
  admin: {
    tableActionPermissions: {
      student: {
        view: false,
        edit: true,
        delete: true,
      },
    },
  },
};

export const getUserPermission = (role) => {
  return permissions[role];
};
export const getTableActionPermissions = (role, tableType) => {
  return permissions[role].tableActionPermissions[tableType];
};
