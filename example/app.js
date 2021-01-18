const Sozdik = require('../src/sozdik');
const sozdik = new Sozdik();

// getTranslation method's usage example.
// Languages could be Russian/Ru or Kazakh/Kz.
sozdik.getTranslation('Здравствуйте', 'Russian', 'Kazakh').then(response => {

    console.log(response);

}).catch(err => {

    console.error(err);

});