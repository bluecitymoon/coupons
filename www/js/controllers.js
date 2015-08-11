angular.module('starter.controllers', [])

    .controller('UserCardsCtrl', function ($scope, Cards, $state, $stateParams) {

        userid = $stateParams.userid;
        tokenId = $stateParams.tokenid;

        $scope.allcards = [];

        Cards.loadMyCards($scope);

        $scope.$on('my-cards-loaded', function(event, data) {

            $scope.allcards = data.cards;
        });

        $scope.showUserOwnedSingleCard = function(mycardId) {
            $state.go('my-card-detail', {cardId: mycardId});
        }
    })

    .controller('CardsCtrl', function ($scope, Cards) {
        $scope.cards = [];

        Cards.loadAllValiableCards($scope);

        $scope.$on('cards-loaded', function(event, data) {
            $scope.cards = data.cards;
        });

        $scope.remove = function (chat) {
            Cards.remove(chat);
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
            });

        });
    })
    .controller('MyCardDetailCtrl', function ($scope, $stateParams, Cards) {

        $scope.card = Cards.getMyCardById($stateParams.cardId);

    });
