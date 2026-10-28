const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/todo")
    .then(() => console.log("DB Connected"))
    .catch(() => console.log("DB Failed"));

const Fruit = mongoose.model("Fruit", { name: String }, "fruit");

app.use(cors());
app.use(express.json());

app.get("/fruitlist", (req, res) => {
    Fruit.find().then((retdata) => {
        console.log(retdata);
        res.send(retdata);
    });
});

app.post("/addfruit", async (req, res) => {
    try {
        const newFruit = await Fruit.create({ name: req.body.entervalue });
        res.status(201).send(newFruit);
        console.log("Added Fruit: ",newFruit);
    } catch (error) {
        res.status(500).send({ error: "Could not save fruit" });
    }
});

app.delete("/fruit/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ error: "Invalid fruit id" });
    }

    try {
        const deletedFruit = await Fruit.findByIdAndDelete(req.params.id);

        if (!deletedFruit) {
            return res.status(404).send({ error: "Fruit not found" });
        }

        const remainingFruit = await Fruit.find();
        res.send(remainingFruit);
        console.log("Deleted Fruit: ",deletedFruit);
    } catch (error) {
        res.status(500).send({ error: "Could not delete fruit" });
    }
});

app.listen(5000, function () {
    console.log("Server Started ....");
});
