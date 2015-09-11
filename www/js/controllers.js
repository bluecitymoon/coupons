angular.module('starter.controllers', [])

    .controller('UserCardsCtrl', function ($scope, Cards, $state, $stateParams, StorageService) {

        userid = $stateParams.userid;
        tokenId = $stateParams.tokenid;

        console.debug('userid ' + userid);
        console.debug('tokenId ' + tokenId);
        if (userid) {
            StorageService.set('userid', userid);
        }

        if (tokenId) {
            StorageService.set('tokenId', tokenId);
        }

        $scope.allcards = [];

        $scope.$on('my-cards-loaded', function (event, data) {

            $scope.allcards = data.cards;
        });

        $scope.showUserOwnedSingleCard = function (mycardId) {
            $state.go('my-card-detail', {cardId: mycardId});
        };

        $scope.$on('$ionicView.enter', function (e) {
            Cards.loadMyCards($scope);
        });

    })

    .controller('CardsCtrl', function ($scope, Cards, $state, $window, $ionicPopup, $stateParams, StorageService) {

        userid = $stateParams.userid;
        tokenId = $stateParams.tokenid;

        if (userid) {
            StorageService.set('userid', userid);
        }

        if (tokenId) {
            StorageService.set('tokenId', tokenId);
        }

        $scope.cards = [];

        $scope.$on('$ionicView.enter', function (e) {
            Cards.loadAllValiableCards($scope);
        });

        $scope.$on('cards-loaded', function (event, data) {
            $scope.cards = data.cards;
        });

        $scope.userGetCoupons = function (typeId) {

            Cards.userGetCoupons($scope, typeId);

        };

        $scope.pickupCouponsOrGotoLink = function (mycardId) {

            var card = Cards.get(mycardId);
            $state.go('card-detail', {cardId: mycardId});

        };

        $scope.$on('code-assigned', function (event, data) {
            var code = data.code;


            //var alertPopup = $ionicPopup.alert({
            //    title: '提示信息',
            //    template: '恭喜您已成功领取，编号为 <h3 style="white-space: nowrap; color: #e42012 ">' + code + '</h3>',
            //    okText: '确定',
            //    okType: 'button button-block button-assertive'
            //});
            //
            //alertPopup.then(function (res) {
            $state.go('tab.mycards', {userid: userid, tokenid: tokenId});
            Cards.loadMyCards($scope);
            //});

        });

    })

    .controller('CardDetailCtrl', function ($scope, $stateParams, Cards, $state, $ionicPopup, $window) {

        $scope.card = Cards.get($stateParams.cardId);

        if (mode == 'dev') {
            $scope.card = {
                "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                "remark": null,
                "ctype": 1,
                "code": '',
                "sponsor": "家电管家",
                "isReceived": 1,
                "url": "www.baidu.com",
                "id": 1,
                "price": 10,
                "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                "name": "元家电管家清洗优惠券",
                "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                "servicePhone": "400-658-0211",
                "deadline": "2015年08月31日"
            };
        }

        $scope.userGetCoupons = function (typeId) {

            var code = $scope.card.code;

            //if (code && code === 2) {
            //    $window.location.href = $scope.card.url;
            //} else {
                Cards.userGetCoupons($scope, typeId);
           // }

        };


        $scope.$on('code-assigned', function (event, data) {
            var code = data.code;


            //var alertPopup = $ionicPopup.alert({
            //    title: '提示信息',
            //    template: '恭喜您已成功领取，编号为 <h3 style="white-space: nowrap; color: #e42012 ">' + code + '</h3>',
            //    okText: '确定',
            //    okType: 'button button-block button-assertive'
            //});
            //
            //alertPopup.then(function (res) {
                $state.go('tab.mycards', {userid: userid, tokenid: tokenId});
                Cards.loadMyCards($scope);
            //});

        });
    })

    .controller('MyCardDetailCtrl', function ($scope, $stateParams, Cards, $window, $document) {

        $scope.card = Cards.getMyCardById($stateParams.cardId);

        if (mode == 'dev') {
            $scope.card = {
                "region": "大家电清洗—北京（六环内）、上海（中环）、广州（荔湾区、白云区、海珠区、天河区、越秀区、黄埔区、番禺区）、深圳（南山区、龙华区、龙岗区、罗湖区、福田区、布吉、坂田、南湾、民治、横岗）",
                "remark": null,
                "ctype": 1,
                "code": '1234567',
                "sponsor": "家电管家",
                "isReceived": 1,
                "url": "http://www.baidu.com",
                "id": 1,
                "price": 10,
                "queryMethod": "进入家电管家微信服务号页面，点击“我的-我的订单”输入手机号，即可查询",
                "name": "元家电管家清洗优惠券",
                "rule": "关注家电管家微信服务号（tada822），提交家电清洗需求后确认下单，在订单确认页面输入“优惠码”即可享受40元上门专享优惠，活动期内下单有效。",
                "servicePhone": "400-658-0211",
                "deadline": "2015年08月31日"
            };
        }

        $scope.useCoupons = function() {

            var url = $scope.card.url;

            if(url) {
                $window.location.href = url;
            }
        };

        $scope.printClipboard = function () {
            var url = $scope.card.url;

            if(url) {
                $window.location.href = url;
            }
        };

        $scope.getCode = function() {
            return $scope.card.code;
        };

        $scope.fallback = function(copy) {

            var url = $scope.card.url;

            if(url) {
                $window.location.href = url;
            }
        };

    });
