export default {
  "GET /api/materials": (req, res) => {
    res.json([
      {
        id: 1,
        name: "面粉",
        price: "10",
        unit: "克"
      },
      {
        id: 2,
        name: "糖",
        price: "20",
        unit: "克"
      },
      {
        id: 3,
        name: "巧克力",
        price: "30",
        unit: "克"
      },
      {
        id: 4,
        name: "草莓",
        price: "40",
        unit: "斤"
      },
      {
        id: 5,
        name: "抹茶",
        price: "40",
        unit: "斤"
      },
      {
        id: 6,
        name: "酸奶",
        price: "40",
        unit: "斤"
      }
    ]);
  }
};
