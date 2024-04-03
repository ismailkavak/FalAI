const express = require("express")
const fal = require("@fal-ai/serverless-client")
const app = express()
const PORT = 8888;
fal.config({
    credentials: "54f4efc6-3806-46d2-b40d-039a4b51fcb4:ed1a4e2863f987d29f611c98924087aa"
});

app.use(express.static('./'))
app.use(express.json());

app.post("/api" , async (req,res) => {
    const result = await fal.subscribe("fal-ai/openlrm", {
        input: {
            image_url : req.body.url
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });
    res.json(result)
})


app.listen(PORT , () => {
    console.log("Server is run!")
})

