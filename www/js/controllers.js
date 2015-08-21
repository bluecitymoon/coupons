angular.module('starter.controllers', [])

    .controller('UserCardsCtrl', function ($scope, Cards, $state, $stateParams, StorageService) {

        userid = $stateParams.userid;
        tokenId = $stateParams.tokenid;

        if(userid) {
            StorageService.set('userid', userid);
        }

        if(tokenId) {
            StorageService.set('tokenId', tokenId);
        }

        $scope.allcards = [];

        $scope.$on('my-cards-loaded', function(event, data) {

            $scope.allcards = data.cards;
        });

        $scope.showUserOwnedSingleCard = function(mycardId) {
            $state.go('my-card-detail', {cardId: mycardId});
        };

        $scope.$on('$ionicView.enter', function(e) {
            Cards.loadMyCards($scope);
        });
    })

    .controller('CardsCtrl', function ($scope, Cards, $state, $window, $ionicPopup) {
        $scope.cards = [];

        Cards.loadAllValiableCards($scope);

        $scope.$on('cards-loaded', function(event, data) {
            $scope.cards = data.cards;
        });

        $scope.remove = function (chat) {
            Cards.remove(chat);
        };

        $scope.pickupCouponsOrGotoLink = function(mycardId) {

            var card = Cards.get(mycardId);

            switch (card.code) {
                case 1:

                    $state.go('card-detail', {cardId: mycardId});
                    break;

                case 2:

                    var url = card.url;
                    var alertPopup = $ionicPopup.alert({
                        title: card.name,
                        template: card.remark,
                        cancelText: '取消',
                        cancelType: 'button button-block button-balanced',
                        okText: '确定',
                        okType: 'button button-block button-positive'

                    });
                    alertPopup.then(function() {

                        if(url) {
                            $window.location.href = url;
                        }
                    });

                    break;
                default :
                    break;
            }

        };

    })

    .controller('CardDetailCtrl', function ($scope, $stateParams, Cards, $state, $ionicPopup) {

        $scope.card = Cards.get($stateParams.cardId);

        $scope.userGetCoupons = function(typeId) {
            Cards.userGetCoupons($scope, typeId);
        }

        $scope.$on('code-assigned', function(event, data) {
            var code = data.code;

            var alertPopup = $ionicPopup.alert({
                title: '提示信息',
                template: '恭喜您已成功领取，编号为 <h3 style="white-space: nowrap; color: #e42012 ">' + code + '</h3>',
                okText: '确定',
                okType: 'button button-block button-assertive'
            });

            alertPopup.then(function(res) {
                $state.go('tab.mycards', {userid: userid, tokenid: tokenId});
                Cards.loadMyCards($scope);
            });

        });
    })

    .controller('MyCardDetailCtrl', function ($scope, $stateParams, Cards) {

        $scope.card = Cards.getMyCardById($stateParams.cardId);

    });
