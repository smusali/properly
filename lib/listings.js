/** External Dependencies */
const {v4} = require('uuid');

/** Custom Listings Class */
class Listings {
  /**
     * Constructor method
     * @param {string} type
     */
  constructor(type) {
    this.type = type;
    this.data = {};
  }

  /**
     * Adds a new listing
     * @param {object} listing
     * @return {string|undefined}
     */
  add(listing) {
    if (listing &&
        listing.constructor === Object &&
        Object.keys(listing).length === 0
    ) {
      return undefined;
    }

    const id = v4();
    this.data[id] = {
      ...listing,
      created: Date.now(),
      updated: Date.now(),
    };

    return id;
  }

  /**
     * Lists all the listings
     * @param {array} ids
     * @return {array}
     */
  list(ids = []) {
    if (!ids || ids.length === 0) {
      ids = Object.keys(this.data);
    }

    return ids.reduce((list, id) => {
      if (id in this.data) {
        const listing = this.retrieve(id);
        list.push({...listing, id});
      }

      return list;
    }, []);
  }

  /**
     * Removes the given listings
     * @param {array} ids
     */
  remove(ids) {
    ids.forEach((id) => {
      delete this.data[id];
    });
  }

  /**
     * Retrieves the specific listing
     * @param {string} id
     * @return {object|undefined}
     */
  retrieve(id) {
    if (id in this.data) return this.data[id];
    return undefined;
  }

  /**
     * Updates the given listing
     * @param {string} id
     * @param {object} listing
     * @return {string|undefined}
     */
  update(id, listing) {
    if (listing &&
      listing.constructor === Object &&
      Object.keys(listing).length === 0
    ) {
      return undefined;
    }

    if (id in this.data) {
      this.data[id] = {
        ...this.data[id],
        ...listing,
        updated: Date.now(),
      };

      return id;
    }

    return undefined;
  }
};

module.exports = Listings;
