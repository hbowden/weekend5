var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/animals', {
      templateUrl: '/public/views/partials/animals.html',
      controller: 'animalController'
    }).
    when('/fav', {
      templateUrl: '/public/views/partials/favorites.html',
      controller: 'favoritesController'
    }).
    when('/home', {
      templateUrl: '/public/views/partials/home.html',
    }).
    otherwise({
      redirectTo: "/home"
    });
}]);
