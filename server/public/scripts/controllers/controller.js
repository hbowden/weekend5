app.controller('animalController', ['$scope', '$http', function ($scope, $http) {
  console.log('animalController');

  var key = '2b77054603a48895cab400d0a905a03c';
  var baseUrl = 'http://api.petfinder.com/';
  updateCount();

  $scope.handleAnimalPick = function () {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.selectedAnimal;
    query += '&output=basic';
    query += '&format=json';

    var request = baseUrl + encodeURI(query) + '&callback=JSON_CALLBACK';

    $http.jsonp(request).then(
        function (response) {
            console.log(response.data);
            $scope.animal = response.data.petfinder.pet;
          });
  };

  $scope.submitFav = function(id, type, description, url, name) {
    $http({
      method: 'POST',
      url: '/favorites',
      data: {
        id: id,
        type: type,
        description: description.substring(0, 99),
        url: url,
        name: name
      }
    }).then(function (response) {
      updateCount();
    });
  };

  function updateCount(){
    $http({
      method: 'GET',
      url: '/animals/count'
    }).then(function (response) {
      $scope.count = response.data;
    });
  }
}]);

app.controller('favoritesController', ['$scope', '$http', function ($scope, $http) {
  console.log('favoritesController');

  $http({
    method: 'GET',
    url: '/animals/fav'
  }).then(function (response) {
    $scope.favorites = response.data;
    updateCount();
  });

  function updateCount(){
    $http({
      method: 'GET',
      url: '/animals/count'
    }).then(function (response) {
      console.log('response object ', response);
      $scope.count = response.data;
      console.log('count 2', $scope.count[0].count);
    });
  }
}]);
