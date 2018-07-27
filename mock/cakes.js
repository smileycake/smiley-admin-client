export default {
    'GET /api/cakes': (req, res) => {
        res.set('x-total-count', 4);
        if (req.query._page === '1') {
            res.json(
                [
                    {
                        id: 1,
                        name: '蓝朋友的心',
                        type: '慕斯',
                        cost: '15.00',
                        price: '45.00',
                        isGroupPurchase: false,
                        children: []
                    },
                    {
                        id: 2,
                        name: '爆浆海盐奶盖',
                        type: '奶油蛋糕',
                        cost: '30.00 - 35.00',
                        price: '98.00 - 98.00',
                        children: [
                            {
                                id: '2-1',
                                name: '巧克力',
                                cost: '30.00',
                                price: '98.00',
                                isGroupPurchase: true,
                            },
                            {
                                id: '2-2',
                                name: '抹茶',
                                cost: '30.00',
                                price: '98.00',
                                isGroupPurchase: true,
                            },
                            {
                                id: '2-3',
                                name: '酸奶奶油',
                                cost: '35.00',
                                price: '98.00',
                                isGroupPurchase: false,
                            },
                        ],
                    }
                ]
            )
        } else {
            res.json(
                [
                    {
                        id: 3,
                        name: '蓝朋友的心1',
                        type: '慕斯',
                        cost: '15.00',
                        price: '45.00',
                        isGroupPurchase: false,
                        children: []
                    },
                    {
                        id: 4,
                        name: '爆浆海盐奶盖1',
                        type: '奶油蛋糕',
                        cost: '30.00 - 35.00',
                        price: '98.00 - 98.00',
                        children: [
                            {
                                id: '2-1',
                                name: '巧克力',
                                cost: '30.00',
                                price: '98.00',
                                isGroupPurchase: true,
                            },
                            {
                                id: '2-2',
                                name: '抹茶',
                                cost: '30.00',
                                price: '98.00',
                                isGroupPurchase: true,
                            },
                            {
                                id: '2-3',
                                name: '酸奶奶油',
                                cost: '35.00',
                                price: '98.00',
                                isGroupPurchase: false,
                            },
                        ],
                    }
                ]
            )
        }
    }
}