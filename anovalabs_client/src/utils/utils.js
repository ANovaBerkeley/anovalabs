module.exports = {
  getJWT: () => {
    return localStorage.getItem('anovaToken');
  }
};
