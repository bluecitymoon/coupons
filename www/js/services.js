angular.module('starter.services', [])

    .factory('Cards', function ($http, apiBase, StorageService) {
        var cards = [];
        var mycards = [];

        return {
            all: function () {
                return cards;
            },

            loadAllValiableCards: function ($scope) {

                $http({
                    url: apiBase + 'ihome/coupontype/coupontypes',
                    params: {
                        residentId: StorageService.get('userid'),
                        pageNo: 1,
                        tokenId: StorageService.get('tokenId')
                    }
                }).success(function (response, status, headers, config) {

                    cards = response.data.coupontypes;

                    if (mode == 'dev') {

                        var fakeDate = [{
                            "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                            "remark": null,
                            "ctype": 1,
                            "code": 1,
                            "sponsor": "家电管家",
                            "isReceived": 1,
                            "url": "",
                            "id": 1,
                            "price": 20,
                            "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "家电管家40元家电清洗优惠券",
                            "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                            "servicePhone": "400-658-0211",
                            "deadline": "2015年08月31日"
                        }, {
                            "region": "上海全境（崇明岛除外）",
                            "remark": "",
                            "ctype": 2,
                            "code": 2,
                            "sponsor": "e洗车",
                            "isReceived": 0,
                            "url": "http://exc.vjifen118.com?from=ttxx",
                            "id": 2,
                            "price": 30,
                            "queryMethod": "进入洗车服务页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "1分钱洗车",
                            "rule": "首次洗车用户提交订单即可享受1分钱洗车",
                            "servicePhone": "400-6019-619",
                            "deadline": "2015年08月31日"
                        }, {
                            "region": "",
                            "remark": "新用户可绑定39元代驾优惠券（有效期1个月）（用户需要提供手机号，商户去后台绑定）",
                            "ctype": 3,
                            "code": 2,
                            "sponsor": "",
                            "isReceived": 0,
                            "url": "http://h5.edaijia.cn/app/index.html?from=01050105",
                            "id": 3,
                            "price": 40,
                            "queryMethod": "",
                            "name": "E代驾",
                            "rule": "",
                            "servicePhone": "",
                            "deadline": null
                        }, {
                            "region": "上海全境（崇明岛除外）",
                            "remark": "",
                            "ctype": 4,
                            "code": 2,
                            "sponsor": "e洗车",
                            "isReceived": 0,
                            "url": "http://exc.vjifen118.com?from=ttxx",
                            "id": 2,
                            "price": 30,
                            "queryMethod": "进入洗车服务页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "1分钱洗车",
                            "rule": "首次洗车用户提交订单即可享受1分钱洗车",
                            "servicePhone": "400-6019-619",
                            "deadline": "2015年08月31日"
                        }, {
                            "region": "上海全境（崇明岛除外）",
                            "remark": "",
                            "ctype": 5,
                            "code": 2,
                            "sponsor": "e洗车",
                            "isReceived": 0,
                            "url": "http://exc.vjifen118.com?from=ttxx",
                            "id": 2,
                            "price": 30,
                            "queryMethod": "进入洗车服务页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "1分钱洗车",
                            "rule": "首次洗车用户提交订单即可享受1分钱洗车",
                            "servicePhone": "400-6019-619",
                            "deadline": "2015年08月31日"
                        }, {
                            "region": "上海全境（崇明岛除外）",
                            "remark": "",
                            "ctype": 6,
                            "code": 2,
                            "sponsor": "e洗车",
                            "isReceived": 0,
                            "url": "http://exc.vjifen118.com?from=ttxx",
                            "id": 2,
                            "price": 30,
                            "queryMethod": "进入洗车服务页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "1分钱洗车",
                            "rule": "首次洗车用户提交订单即可享受1分钱洗车",
                            "servicePhone": "400-6019-619",
                            "deadline": "2015年08月31日"
                        }];

                        cards = fakeDate;
                    }

                    angular.forEach(cards, function(card) {
                        card.css = 'getcard-style-' + card.ctype;
                    });

                    console.debug(JSON.stringify(cards));

                    $scope.$emit('cards-loaded', {cards: cards});

                }).error(function (response, status, headers, config) {

                });
            },

            userGetCoupons: function ($scope, typeId) {

                $http({
                    method: 'POST',
                    url: apiBase + 'ihome/coupontype/coupon',
                    params: {
                        residentId: StorageService.get('userid'),
                        tokenId: StorageService.get('tokenId'),
                        typeId: typeId
                    }

                }).success(function (response, status, headers, config) {

                    var code = response.data.code;
                    $scope.$emit('code-assigned', {code: code});

                }).error(function (response, status, headers, config) {

                });

            },

            loadMyCards: function ($scope) {

                $http({
                    url: apiBase + 'ihome/coupontype/coupons',
                    params: {
                        residentId: StorageService.get('userid'),
                        tokenId: StorageService.get('tokenId'),
                        pageNo: 1
                    }

                }).success(function (response, status, headers, config) {

                    var fakeData = [{
                        "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                        "ctype": 1,
                        "code": "z00385cenr",
                        "sponsor": "家电管家",
                        "url": "",
                        "id": 1,
                        "receivedTime": "2015年08月26日",
                        "price": 20,
                        "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                        "name": "家电管家40元家电清洗优惠券",
                        "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                        "servicePhone": "400-658-0211",
                        "deadline": "2015年08月31日"
                    },
                        {
                            "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                            "ctype": 2,
                            "code": "z00385cenr",
                            "sponsor": "家电管家",
                            "url": "",
                            "id": 1,
                            "receivedTime": "2015年08月26日",
                            "price": 20,
                            "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "家电管家40元家电清洗优惠券",
                            "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                            "servicePhone": "400-658-0211",
                            "deadline": "2015年08月31日"
                        }, {
                            "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                            "ctype": 3,
                            "code": "z00385cenr",
                            "sponsor": "家电管家",
                            "url": "",
                            "id": 1,
                            "receivedTime": "2015年08月26日",
                            "price": 20,
                            "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "家电管家40元家电清洗优惠券",
                            "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                            "servicePhone": "400-658-0211",
                            "deadline": "2015年08月31日"
                        }, {
                            "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                            "ctype": 4,
                            "code": "z00385cenr",
                            "sponsor": "家电管家",
                            "url": "",
                            "id": 1,
                            "receivedTime": "2015年08月26日",
                            "price": 20,
                            "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "家电管家40元家电清洗优惠券",
                            "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                            "servicePhone": "400-658-0211",
                            "deadline": "2015年08月31日"
                        }, {
                            "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                            "ctype": 5,
                            "code": "z00385cenr",
                            "sponsor": "家电管家",
                            "url": "",
                            "id": 1,
                            "receivedTime": "2015年08月26日",
                            "price": 20,
                            "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "家电管家40元家电清洗优惠券",
                            "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                            "servicePhone": "400-658-0211",
                            "deadline": "2015年08月31日"
                        },
                        {
                            "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                            "ctype": 6,
                            "code": "z00385cenr",
                            "sponsor": "家电管家",
                            "url": "",
                            "id": 1,
                            "receivedTime": "2015年08月26日",
                            "price": 20,
                            "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                            "name": "家电管家40元家电清洗优惠券",
                            "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                            "servicePhone": "400-658-0211",
                            "deadline": "2015年08月31日"
                        }
                    ];

                    mycards = response.data.coupons;

                    if (mode === 'dev') {
                        mycards = fakeData;
                    }

                    angular.forEach(mycards, function (card) {

                        card.css = 'mycard-style-' + card.ctype;
                    });

                    $scope.$emit('my-cards-loaded', {cards: mycards});

                    console.debug('my cards : ' + JSON.stringify(mycards));

                }).error(function (response, status, headers, config) {

                });
            },

            get: function (cardId) {
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].id === parseInt(cardId)) {
                        return cards[i];
                    }
                }
                return null;
            },

            getMyCardById: function (mycardId) {
                for (var i = 0; i < mycards.length; i++) {
                    if (mycards[i].id === parseInt(mycardId)) {
                        return mycards[i];
                    }
                }
                return null;
            }
        };
    })

    .factory('StorageService', function ($window) {

        return {
            get: function (key) {
                return $window.localStorage[key];
            },
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            getArray: function (key) {
                return JSON.parse($window.localStorage[key] || '[]');
            }
        };
    })

    .factory('Utils', function () {

        return {
            getImagePathByCType: function (ctype) {

                var imageName = '';
                switch (ctype) {
                    case 1:
                        return 'img/bg_receive_bg03.png';
                        break;
                }
                return imageName;
            }
        };
    });
