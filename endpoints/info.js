/**
 * Provides Information about the Service
 * @param {object} req
 * @param {object} res
 */
const info = (req, res) => {
  res.status(200).send([
    '<i>Sample API Server for Properly</i><br>',
    '<b>Available Routes</b>:',
    ' - <b>GET /info</b>: Displays the details about the API',
    ' - <b>GET /listings</b>: Displays all the listings available',
    ' - <b>GET /listings/:type</b>: Displays the listings of a given type',
    ' - <b>POST /listings/:type</b>: Creates a new listing for a given type',
    ' - <b>GET /listings/:type/:id</b>: Retrieves a specific listing',
    ' - <b>PUT /listings/:type/:id</b>: Updates a specific listing',
    ' - <b>DELETE /listings/:type/:id</b>: Removes a specific listing<br>',
    '<b>Note</b>: A specific listing means a listing characterized by a given id and type<br>',
    '<b>Available Types</b>: rent & sale'
  ].join('<br>'));
};

module.exports = {
  info
};
