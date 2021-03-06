/** Internal Dependencies */
const Listings = require('../lib/listings');

/** Constants */
const listingTypes = {
  rent: new Listings('rent'),
  sale: new Listings('sale'),
};

/**
 * Creates a new listing
 * @param {object} req
 * @param {object} res
 */
const create = (req, res) => {
  const type = req && req.params && req.params.type;
  if (!type || !(type in listingTypes)) {
    res.status(404).json({
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND',
    });

    return;
  }

  const createObject = req && req.body;
  const id = listingTypes[type].add(createObject);
  if (!id) {
    res.status(400).json({
      error: 'Invalid Request Body',
      code: 'EINVALID',
    });

    return;
  }

  res.status(200).json({
    message: `Successfully Created ${id}`,
    id,
  });
};

/**
 * Lists the listings
 * @param {object} req
 * @param {object} res
 */
const list = (req, res) => {
  let types = Object.keys(listingTypes);
  const type = req && req.params && req.params.type;
  if (type) {
    if (!(type in listingTypes)) {
      res.status(404).json({
        error: 'Undefined Listing Type',
        code: 'ENOTFOUND',
      });

      return;
    }

    types = [type];
  }

  const ids = req && req.query && req.query.ids;
  const query = typeof ids === 'string' ? [ids] : ids;
  const listings = [];
  types.forEach((type) => {
    listingTypes[type].list(query).forEach((listing) => {
      listings.push(listing);
    });
  });

  res.status(200).json(listings);
};

/**
 * Removes the listing
 * @param {object} req
 * @param {object} res
 */
const remove = (req, res) => {
  const type = req && req.params && req.params.type;
  if (!type || !(type in listingTypes)) {
    res.status(404).json({
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND',
    });

    return;
  }

  const id = req && req.params && req.params.id;
  listingTypes[type].remove([id]);
  res.status(200).json({
    message: `Successfully Removed ${id}`,
    id,
  });
};

/**
 * Retrieves the listing
 * @param {object} req
 * @param {object} res
 */
const retrieve = (req, res) => {
  const type = req && req.params && req.params.type;
  if (!type || !(type in listingTypes)) {
    res.status(404).json({
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND',
    });

    return;
  }

  const id = req && req.params && req.params.id;
  const listing = listingTypes[type].retrieve(id);
  if (!listing) {
    res.status(404).json({
      error: `No Listing Found for ${id}`,
      code: 'ENOTFOUND',
    });

    return;
  }

  res.status(200).json(listing);
};

/**
 * Updates the listing
 * @param {object} req
 * @param {object} res
 */
const update = (req, res) => {
  const type = req && req.params && req.params.type;
  if (!type || !(type in listingTypes)) {
    res.status(404).json({
      error: 'Undefined Listing Type',
      code: 'ENOTFOUND',
    });

    return;
  }

  const id = req && req.params && req.params.id;
  const updateObject = req && req.body;
  const updatedID = listingTypes[type].update(id, updateObject);
  if (!updatedID) {
    res.status(400).json({
      error: 'Invalid Request Body',
      code: 'EINVALID',
    });

    return;
  }

  res.status(200).json({
    message: `Successfully Updated ${id}`,
    id,
  });
};

module.exports = {
  create,
  list,
  remove,
  retrieve,
  update,
};
