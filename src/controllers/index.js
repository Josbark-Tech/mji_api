const { getAllUsers, addUser} = require('./user.controllers');
const { getAllTypeUsers, addTypeUser} = require('./typeuser.controllers');
const { getAllTypeEvents, addTypeEvent,getOneTypeEvent } = require('./typeevent.controllers');
const { addCountry, getAllCountries } = require('./country.controllers');


module.exports = {
    getAllUsers,
    getAllTypeUsers,
    addTypeUser,
    getAllTypeEvents,
    addTypeEvent,
    getOneTypeEvent,
    addUser,
    addCountry,
    getAllCountries,
}
