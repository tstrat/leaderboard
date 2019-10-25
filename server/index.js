const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// const scores = [
//     {
//         name: "Travis",
//         score: 6
//     },
//     {
//         name: "Hunter",
//         score: 2
//     },
//     {
//         name: "Josh",
//         score: 4
//     },
//     {
//         name: "Mike",
//         score: 4
//     },
//     {
//         name: "Sean",
//         score: 5
//     }
// ];
const scores = [];
io.on("connection", socket => {
    // Form connection to sockets coming in
    // No room is required since they all use the same place
    // console.log('Connected', socket.id);
    socket.on("requestScores", () => socket.emit("update", scores));

    socket.on("addPerson", ({ name }) => {
        scores.push({ name, score: 0 });
        io.emit("update", scores);
    });

    socket.on("updateScore", ({ name, score }) => {
        let index = scores.findIndex(player => player.name === name);
        if (index !== -1) {
            scores[index].score += score;
            io.emit("update", scores);
        }
    });
});

server.listen(4000, () => console.log(`Listening on port 4000`));
