import express from 'express';
const app = express();
const PORT = 3000;
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation-qa' },
        { id: 4, title: 'devops' },
    ],
};
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/courses', (req, res) => {
    res.json(db.courses);
});
app.get('/courses/:id', (req, res) => {
    const foundedCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundedCourse) {
        res.sendStatus(404);
        return;
    }
    res.json(foundedCourse);
});
app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const createdCourse = {
        id: +new Date(),
        title: req.body.title,
    };
    db.courses.push(createdCourse);
    console.log(createdCourse);
    res.json(createdCourse);
});
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(204);
});
app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const foundedCourse = db.courses.find(c => c.id === +req.params.id);
    if (!foundedCourse) {
        res.sendStatus(404);
        return;
    }
    foundedCourse.title = req.body.title;
    res.json(foundedCourse);
});
app.listen(PORT, () => {
    console.log(`example app listening on port${PORT}`);
});
//# sourceMappingURL=index.js.map