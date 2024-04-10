import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import morgan from "morgan";
import protectRoute from "./utils/protechRoute.js";
import session from "express-session";
import compression from "compression";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json()); //This is for palindrom post request where we are sending data in format of JSON

//Adding Morgan logs
app.use(morgan("dev"));

//Using Compression middle ware
app.use(compression());

//Middleware and parsing the value
app.use(express.urlencoded({ extended: false }));
//Mounting the session middleware and mounting it on the root node
app.use(
  "/admin",
  session({
    //It store data in the memory
    name: "sessionID",
    resave: false,
    saveUninitialized: true,
    secret:
      app.get("env") == "production"
        ? process.env.sessionSecret
        : "2BBersdcese45",
    cookie: {
      httpOnly: true,
      maxAge: 18000000,
      secure: app.get("env") === "production" ? true : false,
    },
  })
);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Jai Guruji express Revision</h1>");
  console.log("Requesting URL", req.url);
  console.log(req.method);
});

//----------------------------------------------------------------------------
//HANDLING POST REQREST

// // Route handler for POST requests to "/palindrome"
// app.post("/palindrome", (req, res) => {
//   // Check if the request body contains a "word" field
//   if (!req.body || !req.body.word) {
//     // If no word is supplied, send an error response
//     return res.status(400).send({
//       error: "No word supplied",
//     });
//   }

//   // Extract the word from the request body
//   const word = req.body.word;
//   console.log(req.body);

//   // Check if the word is a palindrome
//   const isPalindrome = checkPalindrome(word);

//   // Send response based on whether the word is a palindrome or not
//   if (isPalindrome) {
//     res.send({
//       message: `${word} is a palindrome`,
//     });
//   } else {
//     res.send({
//       message: `${word} is not a palindrome`,
//     });
//   }
// });

// Function to check if a word is a palindrome
function checkPalindrome(word) {
  // Implementation to check if 'word' is a palindrome
  // For simplicity, let's assume a function to check palindrome
  return word === word.split("").reverse().join("");
}
//------------------------------------------------------------------------------------------------------------------------
//Handling Static HTML Pages
app.set("view engine", "pug");
app.use("/public", express.static(join(__dirname, "public")));

app
  .get("/admin/login", (req, res) => {
    // res.sendFile(join(__dirname, "views", "login.html"));
    res.render("login");
  })
  .post("/admin/login", (req, res) => {
    // res.send("handle login here..... "); //Because we have sent data from Post that y message is coming
    //console.log("E-Mail", req.body.email);
    const { email, password } = req.body;

    if (email == "architgaur" && password == "sam") {
      req.session.user = "Sam Alter"; //Storing data in session
      return res.redirect("/admin/dashboard");
    }
    console.log("Password", req.body.password);
    res.redirect("/admin/login");
  });

//Root Handler

app.get("/admin", (req, res) => {
  req.session.user
    ? res.redirect("/admin/dasboard")
    : res.redirect("/admin/login");
});

app.get("/admin/dashboard", protectRoute("/admin/login"), (req, res) => {
  // Adding custome middle to app.get as itself it is a middle ware
  res.render("dashboard", {
    user: req.session.user,
    posts: [
      {
        id: 1,
        author: "Sam Alter",
        title: "I am the best",
        content: "Express is a wonderful framework for building Node.js app",
      },
      {
        id: 2,
        author: "Zinger",
        title: "I can do it ",
        content: "Express is a wonderful framework for building  app",
      },
    ],
  });
});
app.get("/admin/logout", (req, res) => {
  //res.send("<h1>user has been logged out</h1>");
  delete req.session.user;
  res.redirect("/admin/login"); //here
});
//Adding the passing in data to the postcard pug file
app.post("/api/posts", (req, res) => {
  console.log(req.body);

  res.json({ message: "Got it" });
});
app.listen(3000, () => console.log("Server is Working "));
