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
                    params: {residentId: StorageService.get('userid'), pageNo: 1, tokenId: StorageService.get('tokenId')}
                }).success(function (response, status, headers, config) {

                    cards = response.data.coupontypes;
                    console.debug(cards);

                    $scope.$emit('cards-loaded', {cards: cards});

                }).error(function (response, status, headers, config) {

                });
            },

            userGetCoupons: function ($scope, typeId) {

                $http({
                    method: 'POST',
                    url: apiBase + 'ihome/coupontype/coupon',
                    params: {residentId: StorageService.get('userid'), tokenId: StorageService.get('tokenId'), typeId: typeId}

                }).success(function (response, status, headers, config) {

                    var code = response.data.code;
                    $scope.$emit('code-assigned', {code: code});

                }).error(function (response, status, headers, config) {

                });

            },

            loadMyCards: function($scope) {

                $http({
                    url: apiBase + 'ihome/coupontype/coupons',
                    params: {residentId: StorageService.get('userid'), tokenId: StorageService.get('tokenId'), pageNo: 1}

                }).success(function (response, status, headers, config) {

                    mycards = response.data.coupons;
                    $scope.$emit('my-cards-loaded', {cards: mycards});

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

            getMyCardById: function(mycardId) {
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
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            getArray: function(key) {
                return JSON.parse($window.localStorage[key] || '[]');
            }
        };
    });
