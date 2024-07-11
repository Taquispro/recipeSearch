import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const baseURL = "https://api.edamam.com/api/recipes/v2";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index2.ejs", { Hits: "" });
});
app.post("/", async (req, res) => {
  const recipe = req.body.recipe;
  console.log(recipe);
  try {
    const result = await axios.get(baseURL, {
      params: {
        type: "public",
        q: recipe,
        app_id: "04d8dc39",
        app_key: "ac5134e53f9e6cb218329f7bf742e8d8",
      },
    });
    res.render("index2.ejs", { Hits: result.data.hits });
    console.log(JSON.stringify(result.data.hits[0].recipe.label));
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
