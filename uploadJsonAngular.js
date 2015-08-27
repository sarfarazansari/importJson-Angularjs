//define app
var app = angular.module("myApp", []);

//create service
app.factory('getJsonFileService', [
    '$http', '$q',
    function getJsonFileService($http, $q) {
        console.log('getJsonFileService service fired');

        // interface
        var service = {
            jsonDataArray: [],                   
            getJsonData: getJsonData
        };
        return service;

        // implementation
        function getJsonData() {
          var def = $q.defer();

          $http.get("path_to_json_file")
            .success(function (data) {
                service.jsonDataArray = data;
                def.resolve(data);
                console.log('jsonDataArray returned to controller.');
            })
            .error(function () {
                def.reject("Failed to get jsonDataArray");
            });
          return def.promise;
        }
 
    }
]);

//create controller
app.controller('someController', ['$scope', 'getJsonFileService',
	function ($scope, getJsonFileService){
  	console.log('someController init');

  	var vm = this;
    vm.jsonDataArray = [];
    vm.simpleMode = false;

    vm.getJsonData = function () {
        getJsonFileService.getJsonData()
	        .then(function (data) {
	        	console.log('jsonDataArray retrieval success.');
	        	//got data assign it to a variable
	        	$scope.pagesData = data;
	        },
	        function () {
	            console.log('jsonDataArray retrieval failed.');
	        });
    };

    //init function
    vm.getJsonData();

	}
]);