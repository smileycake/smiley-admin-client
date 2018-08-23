/*
    isSelfPickUp: true: 自提 false: 配送
    status: 1 未付款 2 已付款 3 已完成 4 已退款
 */
export default {
  "GET /api/orders/timeline": (req, res) => {
    if (req.query._date === "2018-08-10") {
      res.json([
        {
          orderId: 1,
          cakes: [
            {
              cakeId: 1,
              specId: "1-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力",
              quantity: 1,
              price: 98
            },
            {
              cakeId: 1,
              specId: "1-2",
              name: "爆浆海盐奶盖",
              spec: "抹茶",
              quantity: 2,
              price: 98
            }
          ],
          status: 1,
          consignee: "张",
          isSelfPickUp: true,
          phone: "12345678901",
          pickUpDate: "2018-08-10",
          pickUpTime: "11:30",
          deliveryAddress: "天津市南开区天津大学",
          deliveryFee: 0,
          remark: "",
          shouldPay: 240,
          realPay: 0
        },
        {
          orderId: 2,
          cakes: [
            {
              cakeId: 2,
              specId: "2-1",
              name: "蓝朋友的心",
              spec: "巧克力",
              quantity: 1,
              price: 39
            }
          ],
          status: 2,
          consignee: "张",
          isSelfPickUp: false,
          phone: 12345678901,
          pickUpDate: "2018-08-10",
          pickUpTime: "12:00",
          deliveryAddress: "天津市南开区天大宿舍",
          deliveryFee: 0,
          remark: "",
          shouldPay: 240,
          realPay: 0
        },
        {
          orderId: 3,
          cakes: [
            {
              cakeId: 1,
              specId: "1-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力",
              quantity: 1,
              price: 98
            },
            {
              cakeId: 1,
              specId: "1-2",
              name: "爆浆海盐奶盖",
              spec: "抹茶",
              quantity: 1,
              price: 98
            },
            {
              cakeId: 2,
              specId: "2-1",
              name: "蓝朋友的心",
              spec: "巧克力",
              quantity: 2,
              price: 39
            }
          ],
          status: 3,
          consignee: "张",
          isSelfPickUp: false,
          phone: 12345678901,
          pickUpDate: "2018-08-10",
          pickUpTime: "12:30",
          deliveryAddress: "天津市南开区大悦城",
          deliveryFee: 0,
          remark: "双份巧克力",
          shouldPay: 240,
          realPay: 240
        },
        {
          orderId: 4,
          cakes: [
            {
              cakeId: 1,
              specId: "1-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力",
              quantity: 1,
              price: 98
            },
            {
              cakeId: 1,
              specId: "1-2",
              name: "爆浆海盐奶盖",
              spec: "抹茶",
              quantity: 1,
              price: 98
            }
          ],
          status: 1,
          consignee: "张",
          isSelfPickUp: false,
          phone: 12345678901,
          pickUpDate: "2018-08-10",
          pickUpTime: "14:30",
          deliveryAddress: "天津市南开区天津大学",
          deliveryFee: 0,
          remark: "",
          shouldPay: 240,
          realPay: 0
        },
        {
          orderId: 5,
          cakes: [
            {
              cakeId: 2,
              specId: "2-1",
              name: "蓝朋友的心",
              spec: "巧克力",
              quantity: 1,
              price: 39
            }
          ],
          status: 2,
          consignee: "张",
          isSelfPickUp: false,
          phone: 12345678901,
          pickUpDate: "2018-08-10",
          pickUpTime: "16:00",
          deliveryAddress: "天津市南开区天大宿舍",
          deliveryFee: 0,
          remark: "",
          shouldPay: 240,
          realPay: 0
        }
      ]);
    } else if (req.query._date === "2018-08-17") {
      res.json([
        {
          orderId: 1,
          cakes: [
            {
              cakeId: 3,
              specId: "3-1",
              name: "心心相印",
              spec: [],
              price: 238,
              quantity: 1
            }
          ],
          consignee: "wxid_s0hus1m3y9vj21",
          phone: "  ",
          deliveryAddress: "  ",
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "不同味道",
          shouldPay: 238,
          realPay: 238,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "10:00"
        },
        {
          orderId: 2,
          cakes: [
            {
              cakeId: 4,
              specId: "4-1",
              name: "儿童蛋糕",
              spec: "简约风",
              price: 200,
              quantity: 1
            }
          ],
          consignee: "孙琪",
          phone: "15902202841",
          deliveryAddress: "问地址",
          deliveryFee: 0,
          isSelfPickUp: false,
          remark: "白色板子，写2 years old",
          shouldPay: 200,
          realPay: 200,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "10:00"
        },
        {
          orderId: 3,
          cakes: [
            {
              cakeId: 1,
              specId: "1-1",
              name: "钻石心",
              spec: "粉紫渐变",
              price: 338,
              quantity: 1
            }
          ],
          consignee: "靳莉",
          phone: "18622109376",
          deliveryAddress: "本溪路永进楼17-105",
          deliveryFee: 22,
          isSelfPickUp: false,
          remark: "妈妈生日快乐",
          shouldPay: 360,
          realPay: 360,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "14:00"
        },
        {
          orderId: 4,
          cakes: [
            {
              cakeId: 2,
              specId: "2-3",
              name: "爆浆海盐奶盖",
              spec: "酸奶奶油",
              price: 98,
              quantity: 1
            }
          ],
          consignee: "张",
          phone: "13920867662",
          deliveryAddress: "马场道117号天津外国语大学国际交流中心",
          deliveryFee: 12,
          isSelfPickUp: false,
          remark: "写字：生日快乐",
          shouldPay: 110,
          realPay: 110,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "16:00"
        },
        {
          orderId: 5,
          cakes: [
            {
              cakeId: 5,
              specId: "5-1",
              name: "红心大慕斯",
              spec: "黑巧克力",
              price: 288,
              quantity: 1
            }
          ],
          consignee: "Hxvvvv1825",
          phone: "15822812197",
          deliveryAddress: "河北区正义道宇萃里16-87-301",
          deliveryFee: 7,
          isSelfPickUp: false,
          remark: "送糖",
          shouldPay: 295,
          realPay: 295,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "16:00"
        },
        {
          orderId: 6,
          cakes: [
            {
              cakeId: 1,
              specId: "1-1",
              name: "心心相印",
              spec: " ",
              price: 238,
              quantity: 1
            }
          ],
          consignee: "wxid_xqhtcrjv9mm522",
          phone: " ",
          deliveryAddress: " ",
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "",
          shouldPay: 238,
          realPay: 238,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "16:00"
        },
        {
          orderId: 7,
          cakes: [
            {
              cakeId: 2,
              specId: "1-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力 + 装饰",
              price: 113,
              quantity: 1
            }
          ],
          consignee: "Honghonghouzi2",
          phone: " ",
          deliveryAddress: " ",
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "写字：祝妈妈生日快乐",
          shouldPay: 113,
          realPay: 113,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "16:00"
        },
        {
          orderId: 8,
          cakes: [
            {
              cakeId: 1,
              specId: "1-1",
              name: "心心相印",
              spec: " ",
              price: 238,
              quantity: 1
            }
          ],
          consignee: "左左",
          phone: "13902193484",
          deliveryAddress: "河西区下瓦房恒华大厦2座2207",
          deliveryFee: 17,
          isSelfPickUp: false,
          remark: "三种味道",
          shouldPay: 255,
          realPay: 255,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "16:00"
        },
        {
          orderId: 9,
          cakes: [
            {
              cakeId: 2,
              specId: "2-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力",
              price: 98,
              quantity: 1
            }
          ],
          consignee: "王欢",
          phone: "13612062193",
          deliveryAddress: "和平区大沽北路121号邮储银行",
          deliveryFee: 12,
          isSelfPickUp: false,
          remark: "黑色蛋糕底托",
          shouldPay: 110,
          realPay: 110,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "17:00"
        },
        {
          orderId: 10,
          cakes: [
            {
              cakeId: 3,
              specId: "3-1",
              name: "心心相印",
              spec: [],
              price: 238,
              quantity: 1
            }
          ],
          consignee: "Xiaoruirui19931109",
          phone: "17602217119",
          deliveryAddress: "河北区月牙河街办事处",
          deliveryFee: 22,
          isSelfPickUp: false,
          remark: "桃心蜡烛",
          shouldPay: 260,
          realPay: 260,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "17:00"
        },
        {
          orderId: 11,
          cakes: [
            {
              cakeId: 3,
              specId: "3-1",
              name: "心心相印",
              spec: [],
              price: 238,
              quantity: 1
            }
          ],
          consignee: "htxqx_only",
          phone: " ",
          deliveryAddress: " ",
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "2黑巧，2乳酪，1抹茶",
          shouldPay: 238,
          realPay: 238,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "17:00"
        },
        {
          orderId: 12,
          cakes: [
            {
              cakeId: 2,
              specId: "2-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力 + 装饰",
              price: 113,
              quantity: 1
            }
          ],
          consignee: "Zwy20021020",
          phone: " ",
          deliveryAddress: " ",
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "现金，加桃心星星",
          shouldPay: 118,
          realPay: 118,
          status: 1,
          pickUpDate: "2018-08-17",
          pickUpTime: "17:10"
        },
        {
          orderId: 13,
          cakes: [
            {
              cakeId: 3,
              specId: "3-1",
              name: "心心相印",
              spec: " ",
              price: 238,
              quantity: 1
            }
          ],
          consignee: "杨颖 Ying289296568",
          phone: " ",
          deliveryAddress: " ",
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "2黑巧，1乳酪，2抹茶，生日帽，桃心蜡烛，写字内容待定",
          shouldPay: 238,
          realPay: 238,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "17:20"
        },
        {
          orderId: 14,
          cakes: [
            {
              cakeId: 2,
              specId: "2-2",
              name: "爆浆海盐奶盖",
              spec: "抹茶",
              price: 98,
              quantity: 1
            }
          ],
          consignee: "Cuilibin23",
          phone: " ",
          deliveryAddress: " ",
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "",
          shouldPay: 98,
          realPay: 98,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "17:30"
        },
        {
          orderId: 15,
          cakes: [
            {
              cakeId: 3,
              specId: "3-1",
              name: "心心相印",
              spec: " ",
              price: 238,
              quantity: 1
            }
          ],
          consignee: "翟 sunshine",
          phone: "15959135586",
          deliveryAddress: " ",
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "2黑巧，2乳酪，1抹茶",
          shouldPay: 238,
          realPay: 238,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "18:00"
        },
        {
          orderId: 16,
          cakes: [
            {
              cakeId: 2,
              specId: "2-1",
              name: "爆浆海盐奶盖",
              spec: "巧克力+装饰",
              price: 113,
              quantity: 1
            }
          ],
          consignee: "llay'rong",
          phone: [],
          deliveryAddress: " ",
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "",
          shouldPay: 113,
          realPay: 113,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "18:00"
        },
        {
          orderId: 17,
          cakes: [
            {
              cakeId: 2,
              specId: "2-2",
              name: "爆浆海盐奶盖",
              spec: "抹茶+装饰",
              price: 113,
              quantity: 1
            }
          ],
          consignee: "Lq520103张继东",
          phone: "17692990940",
          deliveryAddress: [],
          deliveryFee: 0,
          isSelfPickUp: true,
          remark: "写字:一生钟情",
          shouldPay: 113,
          realPay: 113,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "18:30"
        },
        {
          orderId: 18,
          cakes: [
            {
              cakeId: 3,
              specId: "3-1",
              name: "心心相印",
              spec: [],
              price: 238,
              quantity: 1
            }
          ],
          consignee: "spring_hongtian 田红",
          phone: "18920327389",
          deliveryAddress: "河西区洞庭路四信里住宅2-3-1102",
          deliveryFee: 22,
          isSelfPickUp: false,
          remark: "全乳酪 心形蜡烛 6:30从店里送出",
          shouldPay: 260,
          realPay: 260,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "18:30"
        },
        {
          orderId: 19,
          cakes: [
            {
              cakeId: 4,
              specId: "4-1",
              name: "钻石心",
              spec: " ",
              price: 338,
              quantity: 1
            }
          ],
          consignee: "tianjindiaole_no1 郭双成",
          phone: "13516112776",
          deliveryAddress: "咸阳北路与纪念馆路交口 铭越垂钓",
          deliveryFee: 17,
          isSelfPickUp: false,
          remark: "喷色红色，一点金箔",
          shouldPay: 355,
          realPay: 355,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "18:30"
        },
        {
          orderId: 19,
          cakes: [
            {
              cakeId: 6,
              specId: "6-1",
              name: "爆浆海盐奶盖8寸",
              spec: "抹茶+插牌",
              price: 168,
              quantity: 1
            }
          ],
          consignee: "wxid_5zg945m352ag12",
          phone: "18202528658",
          deliveryAddress: "新兴路28号杜鹃川菜",
          deliveryFee: 12,
          isSelfPickUp: false,
          remark: "",
          shouldPay: 180,
          realPay: 180,
          status: 2,
          pickUpDate: "2018-08-17",
          pickUpTime: "19:30"
        }
      ]);
    } else {
      res.json([]);
    }
  }
};
