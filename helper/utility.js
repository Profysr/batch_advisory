export const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.25)`;
};

export const extractSpecificColumns = (row, cols) => {
  return cols.reduce((result, col) => {
    if (row[col] !== undefined) {
      result[col] = row[col];
    }
    return result;
  }, {});
};

export const simplifiedUsers = () => {
  const dbData = localStorage.getItem("dbData")
    ? JSON.parse(localStorage.getItem("dbData"))
    : false;

  if (!dbData) {
    console.log("Enable to fetch Users from database");
    return;
  }

  const users = [
    ...dbData.students.map((student) => ({
      ...student,
      role: "student",
    })),
    ...dbData.advisors.map((advisor) => ({
      ...advisor,
      role: "advisor",
    })),
    ...dbData.admins.map((admin) => ({
      ...admin,
      role: "admin",
    })),
  ];

  // Simplified user data
  // return users.map((user) => ({
  //   id: user.id,
  //   name:user.name,
  //   email: user.email,
  //   password: user.password,
  //   role: user.role,
  // }));
  return users;
};

export const findUserByEmail = (email) => {
  const users = simplifiedUsers();
  return users.find((user) => user.email === email);
};
