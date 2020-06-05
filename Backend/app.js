const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require('./DB/mongoHelper');
const {Task, List, User} = require("./DB/Models");
const bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '10mb'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});

let authenticate = (req,res,next)=>{
    let token = req.header('x-access-token');
    jwt.verify(token,User.getJWTSecret(), (err, decoded)=>{
        if (err)
        {
            res.status(401).send(err);
        }
        else
        {
            req.user_id = decoded._id;
            next();
        }
    })
}

let verifySession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');
    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
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
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            next();
        } else {
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}


//Routes
app.get("/lists", authenticate,(req, res) => {
    List.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    }).catch((err)=>{
       res.send(err);
    });
})

app.post("/lists", authenticate,(req, res) => {
    let title = req.body.title;
    let newList = new List({
        title,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    }).catch((e)=>{
        if(e.code === 11000)
        {
            res.statusMessage = "Duplicate List";
            res.status(200).send({});
        }
        else
        {
            res.status(400).send(e);
        }
    })
})

app.patch("/lists/:id",authenticate, (req, res) => {
    List.findOneAndUpdate({_id: req.params.id, _userId: req.user_id}, {
        $set: req.body
    }).then(() => {
        res.send({message: "Updated Successfully"});
    });
})

app.delete("/lists/:id",authenticate, (req, res) => {
    List.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedDoc) => {
        res.send(removedDoc);
        deleteAllTasksfromList(removedDoc._id);
    });
})

app.get("/lists/:listId/tasks",authenticate, (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    });
})

app.get("/lists/:listId/tasks/new",authenticate, (req, res) => {
    Task.find({
        _listId: req.params.listId,
        status: "New"
    }).then((tasks) => {
        res.send(tasks);
    });
})

app.get("/lists/:listId/tasks/progress",authenticate, (req, res) => {
    Task.find({
        _listId: req.params.listId,
        status: "Progress"
    }).then((tasks) => {
        res.send(tasks);
    });
})

app.get("/lists/:listId/tasks/completed",authenticate, (req, res) => {
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

app.post("/lists/:listId/tasks",authenticate, (req, res) => {
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list)=>{
        if(list)
        {
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
        }
        else
        {
            res.sendStatus(404);
        }
    })

})

app.patch("/lists/:listId/tasks/:taskId",authenticate, (req, res) => {
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list)=>{
        if(list)
        {
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                $set: req.body
            }).then(() => {
                res.send({message: "Updated Successfully"});
            });
        }
        else
        {
            res.sendStatus(404);
        }
    })

})

app.delete("/lists/:listId/tasks/:taskId", authenticate, (req, res) => {
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list)=>{
        if(list)
        {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((removedDoc) => {
                res.send(removedDoc);
            });
        }
        else
        {
            res.sendStatus(404);
        }
    })

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
        if(e.code === 11000)
        {
            res.statusMessage = "Duplicate Email";
            res.status(200).send(e);
        }
        else
        {
            res.status(400).send(e);
        }
    })
})

app.get("/profile",authenticate,(req,res)=>{
    User.findOne({
        _id: req.user_id
    }).then((user) => {
        res.send(user);
    }).catch((err)=>{
        res.send(err);
    });
});

app.get("/users", (req,res)=>{
    User.find().then((users)=>{
        res.send(users);
    }).catch((err)=>{
        res.send(err);
    });
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
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.statusMessage = "Wrong credentials!";
        res.status(200).send(e);
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


let deleteAllTasksfromList = (_listId)=>{
    Task.deleteMany({
        _listId
    }).then(()=>{
        console.log("all Tasks deleted");
    });
}

const staticFilePath = './public'
app.use(express.static(staticFilePath));
app.get('*', function(req, res) {
    res.sendFile( __dirname + "/public/" + "index.html" );
});

app.listen(3000, () => {
    console.log("App is listening on 3000");
});