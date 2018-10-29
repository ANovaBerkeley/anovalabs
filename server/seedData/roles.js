module.exports = [
  {
    roles: "ADMIN",
    description: "provides root access"
  },
  {
    roles: "STUDENT",
    description: "provides access to only student resources"
  },
  {
    roles: "MENTOR",
    description: "provides access to only content to a mentor's assigned site"
  },
  {
    roles: "SITE LEADER",
    description:
      "provides access to all CRUD operations for content and students in a site"
  },
  {
    roles: "GUEST",
    description: "provides access only to the homepage"
  }
];