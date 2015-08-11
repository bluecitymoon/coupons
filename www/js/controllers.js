angular.module('starter.controllers', [])

    .controller('UserCardsCtrl', function ($scope, Cards) {
        $scope.allcards = [];

        Cards.loadMyCards($scope);

        $scope.$on('my-cards-loaded', function(event, data) {

            $scope.allcards = data.cards;
        });
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

    .controller('CardDetailCtrl', function ($scope, $stateParams, Cards, $state) {

        $scope.card = Cards.get($stateParams.cardId);
        console.debug(JSON.stringify($scope.card));

        $scope.userGetCoupons = function(typeId) {
            Cards.userGetCoupons($scope, typeId);
        }

        $scope.$on('code-assigned', function(event, data) {
            var code = data.code;

            alert('恭喜您已成功领取，编号为' + code);

            $state.go('tab.mycards');

        });
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
