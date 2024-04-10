import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("<h1>Jai Guruji express Revision</h1>");
  console.log("Requesting URL", req.url);
  console.log(req.method);
});

//----------------------------------------------------------------------------
//HANDLING POST REQREST

// Route handler for POST requests to "/palindrome"
app.post("/palindrome", (req, res) => {
  // Check if the request body contains a "word" field
  if (!req.body || !req.body.word) {
    // If no word is supplied, send an error response
    return res.status(400).send({
      error: "No word supplied",
    });
  }

  // Extract the word from the request body
  const word = req.body.word;
  console.log(req.body);

  // Check if the word is a palindrome
  const isPalindrome = checkPalindrome(word);

  // Send response based on whether the word is a palindrome or not
  if (isPalindrome) {
    res.send({
      message: `${word} is a palindrome`,
    });
  } else {
    res.send({
      message: `${word} is not a palindrome`,
    });
  }
});

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
    res.send("handle login here..... "); //Because we have sent data from Post that y message is coming
  });

app.listen(3000, () => console.log("Server is Working "));
