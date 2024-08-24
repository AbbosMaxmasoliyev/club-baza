const actionPermission = (targetName, action) => {
  const permissions = localStorage.getItem("permissions");

  // Parse permissions into an array
  const permissionKeys = JSON.parse(permissions);
  // Check if targetName is in permissionKeys and its action state is "detail"
  const hasDetailPermission = permissionKeys.some(
    (permission) => permission.target === targetName && permission.action === action
  );

  return hasDetailPermission;
};

export default actionPermission;