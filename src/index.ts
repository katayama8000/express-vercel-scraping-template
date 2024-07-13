import express from "express";
import { launch, type Page } from "puppeteer";

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

app.get("/", async (request, response) => {
    const res = await getScreenshot("https://www.google.com");
    response.setHeader("Content-Type", "image/png");
    response
        .status(200)
        .send(res);
});

app
    .listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
    .on("error", (error) => {
        // エラーの処理
        throw new Error(error.message);
    });
