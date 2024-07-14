import express from "express";
import { launch, type Page } from "puppeteer";
import PackageJson from "../package.json";


const app = express();

const PORT = 3000

const getScreenshot = async (url: string): Promise<Buffer> => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(url);
    const screenshot = await page.screenshot();
    await browser.close();
    return screenshot;
}

app.get("/", async (_request, response) => {
    const res = await getScreenshot("https://www.google.com");
    console.log(res);
    response.setHeader("Content-Type", "image/png");
    response
        .status(200)
        .send(res);
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
