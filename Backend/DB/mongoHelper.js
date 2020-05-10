const mongoHelper = require('mongoose');

mongoHelper.Promise = global.Promise;
mongoHelper.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

mongoHelper.set('useCreateIndex', true);
mongoHelper.set('useFindAndModify', false);


module.exports = {
    mongoHelper: mongoHelper
};