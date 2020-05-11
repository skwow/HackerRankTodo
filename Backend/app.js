const express = require("express");
const app = express();

const mongoose = require('./DB/mongoHelper')

const bodyParser = require("body-parser")
app.use(bodyParser.json());
const {Task, List} = require("./DB/Models")

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, HEAD, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

app.listen(3000, () => {
    console.log("App is listening on 3000");
})