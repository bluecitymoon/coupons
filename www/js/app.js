var userid = 7;
var tokenId = '90816555e41c490989f9faf2bc568a6e';

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .constant('apiBase', 'http://121.40.148.98:8990/api/')

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            .state('tab.mycards', {
                url: '/mycards/:userid/:tokenid',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-my-cards.html',
                        controller: 'UserCardsCtrl'
                    }
                }
            })

            .state('tab.cards', {
                url: '/cards',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-cards.html',
                        controller: 'CardsCtrl'
                    }
                }
            })

            .state('card-detail', {
                url: '/carddetail/:cardId',
                templateUrl: 'templates/card-detail.html',
                controller: 'CardDetailCtrl'


            })

            .state('my-card-detail', {
                url: '/mycarddetail/:cardId',
                templateUrl: 'templates/my-card-detail.html',
                controller: 'MyCardDetailCtrl'


            });

        $urlRouterProvider.otherwise('/tab/mycards/' + userid + '/' + tokenId);

    });
