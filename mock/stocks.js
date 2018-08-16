export default {
  "GET /api/stocks": (req, res) => {
    res.set("x-total-count", 4);
    if (req.query._page === "1") {
      res.json([
        {
          id: 1,
          name: "糖",
          price: 10,
          unit: "克",
          remain: 50,
          lowRemain: 30
        },
        {
          id: 2,
          name: "面粉",
          price: 2,
          unit: "克",
          remain: 50,
          lowRemain: 40
        }
      ]);
    } else {
      res.json([]);
    }
  }
};
