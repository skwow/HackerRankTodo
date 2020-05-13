const express = require("express");
const app = express();

const mongoose = require('./DB/mongoHelper')
const {Task, List, User} = require("./DB/Models")
const bodyParser = require("body-parser")
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, HEAD, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});

let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    // console.log(req);
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');
    // console.log(refreshToken,_id);
    User.findByIdAndToken(_id, refreshToken).then((user) => {
        // console.log(user);
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}


//Routes
app.get("/lists", (req, res) => {
    List.find({}).then((lists) => {
        res.send(lists);
    });
})

app.post("/lists", (req, res) => {
    let title = req.body.title;
    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    });
})

app.patch("/lists/:id", (req, res) => {
    List.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({message: "Updated Successfully"});
    });
})

app.delete("/lists/:id", (req, res) => {
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedDoc) => {
        res.send(removedDoc);
    });
})

app.get("/lists/:listId/tasks", (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    });
})

app.get("/lists/:listId/tasks/new", (req, res) => {
    Task.find({
        _listId: req.params.listId,
        status: "New"
    }).then((tasks) => {
        res.send(tasks);
    });
})

app.get("/lists/:listId/tasks/progress", (req, res) => {
    Task.find({
        _listId: req.params.listId,
        status: "Progress"
    }).then((tasks) => {
        res.send(tasks);
    });
})

app.get("/lists/:listId/tasks/completed", (req, res) => {
    Task.find({
        _listId: req.params.listId,
        status: "Completed"
    }).then((tasks) => {
        res.send(tasks);
    });
})

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOne({
        _listId: req.params.listId,
        _id: req.params.taskId
    }).then((task) => {
        res.send(task);
    });
})

app.post("/lists/:listId/tasks", (req, res) => {
    console.log(req);
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId,
        status: req.body.status,
        type: req.body.type,
        due: req.body.due,
    });
    newTask.save().then((taskDoc) => {
        res.send(taskDoc);
    });
})

app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.send({message: "Updated Successfully"});
    });
})

app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedDoc) => {
        res.send(removedDoc);
    });
})

app.post("/users", (req,res)=>{
    let body = req.body;
    let newUser = new User(body);
    newUser.save().then(()=>{
        return newUser.createSession();
    }).then((refreshToken)=>{
        return newUser.generateAccessAuthToken().then((accessToken)=>{
            return {accessToken, refreshToken}
        });
    }).then((authTokens)=>{
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            return user.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

/**
 * Purpose: generates and returns an access token
 */
app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})



app.listen(3000, () => {
    console.log("App is listening on 3000");
})