const { getAllUsers, addUser} = require('./user.controllers');
const { getAllTypeUsers, addTypeUser} = require('./typeuser.controllers');
const { getAllTypeEvents, addTypeEvent,getOneTypeEvent } = require('./typeevent.controllers');
const { addCountry, getAllCountries } = require('./country.controllers');
const { addTypeActor, getAllTypeActors, getOneTypeActor } = require('./typeactor.controllers');


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
    addTypeActor,
    getAllTypeActors,
    getOneTypeActor,
}
