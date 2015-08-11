angular.module('starter.services', [])

    .factory('Cards', function ($http, apiBase) {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var cards = [];
        var fakeResponse = {
            "status": 1,
            "msg": null,
            "request": "",
            "data": {
                "coupontypes": [
                    {
                        "id": 1,
                        "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                        "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                        "name": "家电管家40元家电清洗优惠券",
                        "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                        "servicePhone": "400-658-0211",
                        "sponsor": "家电管家",
                        "isReceived": 0,
                        "deadline": "2015年08月31日"
                    }
                ]
            }
        };

        return {

            all: function () {
                return cards;
            },

            loadAllValiableCards: function ($scope) {

                $http({
                    url: apiBase + 'ihome/coupontype/coupontypes',
                    params: {residentId: 7, pageNo: 1, tokenId: '90816555e41c490989f9faf2bc568a6e'}
                }).success(function (response, status, headers, config) {

                    cards = response.data.coupontypes;
                    $scope.$emit('cards-loaded', {cards: cards});

                    //cards = fakeResponse.data.coupontypes;

                }).error(function (response, status, headers, config) {
                    cards = fakeResponse.data.coupontypes;
                    $scope.$emit('cards-loaded', {cards: cards});

                });
            },

            userGetCoupons: function ($scope, typeId) {

                $http({
                    method: 'POST',
                    url: apiBase + 'ihome/coupontype/coupon',
                    params: {residentId: 7, tokenId: '90816555e41c490989f9faf2bc568a6e', typeId: typeId}

                }).success(function (response, status, headers, config) {

                    var code = response.data.code;
                    $scope.$emit('code-assigned', {code: code});

                }).error(function (response, status, headers, config) {
                    alert('获取优惠券失败');
                });

            },

            loadMyCards: function($scope) {

                $http({
                    url: apiBase + 'ihome/coupontype/coupons',
                    params: {residentId: 7, tokenId: '90816555e41c490989f9faf2bc568a6e', pageNo: 1}

                }).success(function (response, status, headers, config) {

                    var mycards = response.data.coupons;
                    console.debug(mycards);

                    $scope.$emit('my-cards-loaded', {cards: mycards});

                }).error(function (response, status, headers, config) {
                    alert('获取我的优惠券失败');
                });
            },

            get: function (cardId) {
                for (var i = 0; i < cards.length; i++) {
                    if (cards[i].id === parseInt(cardId)) {
                        return cards[i];
                    }
                }
                return null;
            }
        };
    });
