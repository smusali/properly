/**
 * Provides Information about the Service
 * @param req
 * @param res
 */
const info = (req, res) => {
  res.status(200).send([
    '<i>Sample API Server for Properly</i><br>',
    'Available Routes:',
    ' - <b>GET /info</b>: Displays the details about the API'
  ].join('<br>'));
};

module.exports = {
  info
};
