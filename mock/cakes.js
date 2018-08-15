export default {
  "GET /api/cakes": (req, res) => {
    res.set("x-total-count", 4);
    if (req.query._page === "1") {
      res.json([
        {
          id: 1,
          name: "蓝朋友的心",
          type: "慕斯",
          cost: "15.00",
          price: "45.00",
          isGroupPurchase: false,
          children: []
        },
        {
          id: 2,
          name: "爆浆海盐奶盖",
          type: "奶油蛋糕",
          cost: "30.00 - 35.00",
          price: "98.00 - 98.00",
          children: [
            {
              id: "2-1",
              name: "巧克力",
              cost: "30.00",
              price: "98.00",
              isGroupPurchase: true
            },
            {
              id: "2-2",
              name: "抹茶",
              cost: "30.00",
              price: "98.00",
              isGroupPurchase: true
            },
            {
              id: "2-3",
              name: "酸奶奶油",
              cost: "35.00",
              price: "98.00",
              isGroupPurchase: false
            }
          ]
        }
      ]);
    } else {
      res.json([
        {
          id: 3,
          name: "蓝朋友的心1",
          type: "慕斯",
          cost: "15.00",
          price: "45.00",
          isGroupPurchase: false,
          children: []
        },
        {
          id: 4,
          name: "爆浆海盐奶盖1",
          type: "奶油蛋糕",
          cost: "30.00 - 35.00",
          price: "98.00 - 98.00",
          children: [
            {
              id: "2-1",
              name: "巧克力",
              cost: "30.00",
              price: "98.00",
              isGroupPurchase: true
            },
            {
              id: "2-2",
              name: "抹茶",
              cost: "30.00",
              price: "98.00",
              isGroupPurchase: true
            },
            {
              id: "2-3",
              name: "酸奶奶油",
              cost: "35.00",
              price: "98.00",
              isGroupPurchase: false
            }
          ]
        }
      ]);
    }
  },
  "GET /api/cakeDetail": (req, res) => {
    if (req.query._cakeId === "1") {
      res.json({
        id: 1,
        name: "蓝朋友的心",
        type: "慕斯",
        specs: [
          {
            name: "黑巧克力",
            price: "39.00",
            materials: [
              {
                id: 3,
                name: "巧克力",
                quantity: "20",
                price: 10
              },
              {
                id: 2,
                name: "糖",
                quantity: "20",
                price: 10
              }
            ],
            isGroupPurchase: false
          }
        ]
      });
    } else if (req.query._cakeId === "2") {
      res.json({
        id: 2,
        name: "爆浆海盐奶盖",
        type: "奶油蛋糕",
        specs: [
          {
            name: "巧克力",
            price: "98.00",
            materials: [
              {
                id: 1,
                name: "面粉",
                quantity: 50,
                price: 10
              },
              {
                id: 3,
                name: "巧克力",
                quantity: 20,
                price: 10
              },
              {
                id: 2,
                name: "糖",
                quantity: 20,
                price: 10
              }
            ],
            isGroupPurchase: true
          },
          {
            name: "抹茶",
            price: "98.00",
            materials: [
              {
                id: 1,
                name: "面粉",
                quantity: 50,
                price: 10
              },
              {
                id: 5,
                name: "抹茶",
                quantity: 20,
                price: 15
              },
              {
                id: 2,
                name: "糖",
                quantity: 20,
                price: 10
              }
            ],
            isGroupPurchase: false
          },
          {
            name: "酸奶奶油",
            price: "98.00",
            materials: [
              {
                id: 1,
                name: "面粉",
                quantity: 50,
                price: 10
              },
              {
                id: 6,
                name: "酸奶",
                quantity: 20,
                price: 10
              },
              {
                id: 2,
                name: "糖",
                quantity: 30,
                price: 12
              }
            ],
            isGroupPurchase: true
          }
        ]
      });
    }
  },
  "GET /api/cakeType": (req, res) => {
    res.json([
      {
        id: 1,
        name: "奶油蛋糕"
      },
      {
        id: 2,
        name: "慕斯"
      }
    ]);
  },
  "GET /api/cakeList": (req, res) => {
    res.json([
      {
        id: 1,
        name: "爆浆海盐奶盖",
        specs: [
          {
            id: "1-1",
            name: "巧克力",
            price: 98
          },
          {
            id: "1-2",
            name: "抹茶",
            price: 98
          },
          {
            id: "1-3",
            name: "酸奶奶油",
            price: 98
          }
        ]
      },
      {
        id: 2,
        name: "蓝朋友的心",
        specs: [
          {
            id: "2-1",
            name: "巧克力",
            price: 39
          }
        ]
      }
    ]);
  }
};
