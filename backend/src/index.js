const express = require('express')
const cors = require('cors')
const { v4:uuidv4, validate } = require('uuid')

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function logRequest(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}], ${url}`;

    console.log(logLabel);

    return next();
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if (!validate(id)) {
        return response.status(400).json({ error: 'Invalid Project Id' })
    }

    next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId);
    
app.get('/projects', (request, response) => {
    const {title} = request.query;

    const results = title ? projects.filter(project => project.title.includes(title)) : projects

    // console.log(title);
    // console.log(owner);

    return response.json(results);
})

app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    const project = {id: uuidv4(), title, owner}

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id == id)

    if(projectIndex < 0) {
        return response.status(400).json({error: 'Project Not Found'})
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id)

    if(projectIndex < 0) {
        return response.status(400).json({error: 'Project Not Found'})
    }

    projects.splice(projectIndex, 1)

    response.status(204).send();

});

app.listen(3333, () => {
    console.log('Ligou!');
});