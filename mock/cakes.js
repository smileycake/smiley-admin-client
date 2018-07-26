export default {
    'GET /api/cakes': (req, res) => {
        if (req.query._page === '1') {
            res.json({
                result: [
                    {
                        id: 1,
                        name: '蓝朋友的心',
                        type: '慕斯',
                        cost: '15.00',
                        price: '45.00',
                        isGroupPurchase: false,
                        sepicification: [],
                    },
                    {
                        id: 2,
                        name: '爆浆海盐奶盖',
                        type: '奶油蛋糕',
                        cost: '30.00 - 35.00',
                        price: '98.00 - 98.00',
                        isGroupPurchase: false,
                        sepicification: [
                            {
                                name: '巧克力',
                                cost: '30.00',
                                price: '98.00'
                            },
                            {
                                name: '抹茶',
                                cost: '30.00',
                                price: '98.00'
                            },
                            {
                                name: '酸奶奶油',
                                cost: '35.00',
                                price: '98.00'
                            },
                        ],
                    }
                ]
            })
        } else {
            res.json({
                result: [
                    {
                        id: 1,
                        name: '蓝朋友的心1',
                        type: '慕斯',
                        cost: '15.00',
                        price: '45.00',
                        isGroupPurchase: false,
                        sepicification: [],
                    },
                    {
                        id: 2,
                        name: '爆浆海盐奶盖1',
                        type: '奶油蛋糕',
                        cost: '30.00 - 35.00',
                        price: '98.00 - 98.00',
                        isGroupPurchase: false,
                        sepicification: [
                            {
                                name: '巧克力',
                                cost: '30.00',
                                price: '98.00'
                            },
                            {
                                name: '抹茶',
                                cost: '30.00',
                                price: '98.00'
                            },
                            {
                                name: '酸奶奶油',
                                cost: '35.00',
                                price: '98.00'
                            },
                        ],
                    }
                ]
            })
        }
    }
}