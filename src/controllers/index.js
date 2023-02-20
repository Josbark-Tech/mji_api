const { getAllUsers, addUser} = require('./user.controllers');
const { getAllTypeUsers, addTypeUser} = require('./typeuser.controllers');
const { getAllTypeEvents, addTypeEvent,getOneTypeEvent } = require('./typeevent.controllers');


module.exports = {
    getAllUsers,
    getAllTypeUsers,
    addTypeUser,
    getAllTypeEvents,
    addTypeEvent,
    getOneTypeEvent,
    addUser,
}
