import express from 'express';
import { URL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';
import serveIndex from 'serve-index';
import { getUsers, getUser, getUserByID, register } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


app.use('/public',express.static('public/css'));



app.use(express.json());
//app.use("/main", main);

app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname+"/home.html"));
});

app.get("/home.html", (req, res) => {
        res.sendFile(path.join(__dirname+"/home.html"));
});

app.get("/index.html", (req, res) => {
        res.sendFile(path.join(__dirname+"/index.html"));
});


app.post("/", async (req, res) => {
                const usernameInput = req.body.usernameInput;
                const passwordInput = req.body.passwordInput;
                const user = await getUser(usernameInput, passwordInput );
                res.status(201);
                console.log(req.body);
                        if (user) {
                              // Redirect to the home route and pass the username as a query parameter
                                req.session.username = user.Username;
                                 console.log(req.session);
                        res.redirect("/home.html");
                        } else {
                      // Handle authentication failure
                        res.status(401).send('Authentication failed '+req.body.usernameInput+" "+req.body.passwordInput);
                        }
        });

/*
app.get("/users", async (req, res) => {
        const users = await getUsers();
        res.send(users);
});

app.get("/users/:id", async (req, res) => {
        const id = req.params.id;
        const user = await getUserByID(id);
        res.send(user);
});

app.post("/users", async (req, res) => {
        const { username, password } = req.body;
        const user = await register(username, password, password);
        res.status(201).send(user);
});
*/

app.use((err, req, res, next) => {
        console.log(err.stack);
        res.status(500).send("Something broke");
});

app.use('/public', express.static('public'));
app.use('/public', serveIndex('public'));

app.listen(3000, () => {
        console.log("Server is running on port 3000");
});