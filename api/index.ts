import express from "express";
import PackageJson from "../package.json";


const app = express();

const PORT = 3000


app.get("/", async (_request, response) => {
    response.json({ message: "Hello World!" });
});

app.get("/version", async (_request, response) => {
    console.log(PackageJson.version);
    response.json({ version: PackageJson.version });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}).on("error", (error) => {
    throw new Error(error.message);
});

export default app;
