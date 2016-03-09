'use strict';

angular.module('news-main', ['megazord'])
    .controller('news-main-controller', ['$scope', '_router', '_screen', '_screenParams', '$http','lodash','$appLoader','$ionicScrollDelegate', 
    	function ($scope, _router, _screen, _screenParams, $http, _, $appLoader, $ionicScrollDelegate) {
        _screen.initialize($scope, _screenParams);
        function getData(url) {
           // if (ionic.Platform.isIOS()) {
                $appLoader.show(); 
                $http.get(url)
                    .then(function(result) {
                        $scope.sections = []; 
                        for (var i=0; i<result.data.posts.length; i+=2) {
                            var section = [];
                            for (var j=i; j<i+2 && j<result.data.posts.length; j++) {
                                section.push(result.data.posts[j]);
                            }
                            $scope.sections.push(section);
                        }
                        $appLoader.hide(); 
                    }).catch(function(result) {
                        $appLoader.hide(); 
                    });

          //  }
        }

        getData('https://webhose.io/search?token=b5c8380c-6cf8-4c20-8611-f5ca6855c32e&format=json&q=United%20States&ts=1449594873836'); 

        $scope.$on('filterNews', function(event, data) {  
            $scope.filter = data; 
            var url = 'https://webhose.io/search?token=b5c8380c-6cf8-4c20-8611-f5ca6855c32e&format=json&q='+$scope.filter+'&ts=1449594873836'; 
            getData(url); 
        })

        $scope.goTo = function(news) {
            _router.fireEvent({
                name: 'goToDetail',
                params: {
                    data: news
                }
            })
        }

        //Add your controller logic here.
    }]); 