angular.module('starter.services', [])

    .factory('Cards', function ($http, apiBase) {
        var cards = [];
        var mycards = [];

        return {
            all: function () {
                return cards;
            },

            loadAllValiableCards: function ($scope) {

                $http({
                    url: apiBase + 'ihome/coupontype/coupontypes',
                    params: {residentId: userid, pageNo: 1, tokenId: tokenId}
                }).success(function (response, status, headers, config) {

                    cards = response.data.coupontypes;
                    $scope.$emit('cards-loaded', {cards: cards});

                }).error(function (response, status, headers, config) {
                    alert('获取优惠券失败');

                });
            },

            userGetCoupons: function ($scope, typeId) {

                $http({
                    method: 'POST',
                    url: apiBase + 'ihome/coupontype/coupon',
                    params: {residentId: userid, tokenId: tokenId, typeId: typeId}

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
                    params: {residentId: userid, tokenId: tokenId, pageNo: 1}

                }).success(function (response, status, headers, config) {

                    mycards = response.data.coupons;
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
            },

            getMyCardById: function(mycardId) {
                for (var i = 0; i < mycards.length; i++) {
                    if (mycards[i].id === parseInt(mycardId)) {
                        return mycards[i];
                    }
                }
                return null;
            }
        };
    });
