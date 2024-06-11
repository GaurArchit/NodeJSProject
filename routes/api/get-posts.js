export default (req, res) => {
  const posts = [
    {
      id: 1,
      name: "Archit Gaur",
    },
    {
      id: 2,
      name: "Arpit Kaushal",
    },
  ];
  res.json(posts);
};
