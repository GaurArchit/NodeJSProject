export default (req, res) => {
  res.render("dashboard", {
    user: req.session.user,
    posts: [
      {
        id: 1,
        author: "Sam Sandy",
        title: "I am the best",
        content: "Express is a wonderful framework for building Node.js app",
      },
      {
        id: 2,
        author: "zoro",
        title: "I can do it ",
        content: "Express is a wonderful framework for building  app",
      },
    ],
  });
};
