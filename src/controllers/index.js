const { getAllUsers, addUser} = require('./user.controllers');
const { getAllTypeUsers, addTypeUser} = require('./typeuser.controllers');
const { getAllTypeEvents, addTypeEvent,getOneTypeEvent } = require('./typeevent.controllers');
const { addCountry, getAllCountries } = require('./country.controllers');
const { addTypeActor, getAllTypeActors, getOneTypeActor } = require('./typeactor.controllers');
const { getAllEvents, addEvent, getMyEvents,getOneEventCreated } = require('./event.controllers');
const {login} = require('./login.controllers');

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
    getAllEvents,
    getMyEvents,
    addEvent,
    login,
    getOneEventCreated,
}
