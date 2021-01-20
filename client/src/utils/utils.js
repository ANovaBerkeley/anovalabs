module.exports = {
  getAnovaToken: () => localStorage.getItem('anovaToken'),
  getGoogleToken: () => localStorage.getItem('googleToken'),
  removeAnovaToken: () => localStorage.removeItem('anovaToken'),
  removeGoogleToken: () => localStorage.removeItem('googleToken'),
};
