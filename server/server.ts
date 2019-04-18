import express from "express";
import path from "path";

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
    if (req.hostname !== "localhost" && !req.secure) {
        return res.redirect(`https://${req.hostname}${req.url}`);
    }
    return next();
});

app.get("*", (_req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
