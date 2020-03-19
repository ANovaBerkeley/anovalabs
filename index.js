const port = process.env.PORT || 5000;
const app = require('./app');

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
