module.exports = [
  {
    roleId: 1,
    roles: "ADMIN",
    description: "provides root access"
  },
  {
    roleId: 2,

    roles: "STUDENT",
    description: "provides access to only student resources"
  },
  {
    roleId: 3,

    roles: "MENTOR",
    description: "provides access to only content to a mentor's assigned site"
  },
  {
    roleId: 4,

    roles: "SITE LEADER",
    description:
      "provides access to all CRUD operations for content and students in a site"
  },
  {
    roleId: 5,
    roles: "GUEST",
    description: "provides access only to the homepage"
  }
];
