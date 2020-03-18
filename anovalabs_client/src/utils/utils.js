module.exports = {
  getJWT: () => localStorage.getItem('anovaToken'),
  removeJWT: () => localStorage.removeItem('anovaToken'),
};
