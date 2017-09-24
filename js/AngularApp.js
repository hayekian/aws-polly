/// <reference path="HLib.js" />



var AngApp = angular.module('App', ['ngRoute', 'ngSanitize']);


AngApp.factory('$exceptionHandler', function () {
    return function errorCatcherHandler(exception, cause) {
        var obj = {};
        obj.Exception = exception;
        obj.Cause = cause;
        obj.StackTrace = exception.stack;
        obj.URL = window.location.href;
        obj.App = APP;
        console.log(JSON.stringify(obj));
    };
});


AngApp.run(['$rootScope', '$http', '$location', function ($rootScope, $http, $location) {
    ROOT = $rootScope;
    ROOT.Log = "";
  
}]);



AngApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/home',
        {
            templateUrl: "Main.aspx", controller: 'HomeCtrl'
        }).when('/app/:id',
        {
            templateUrl: "ViewApplication.aspx", controller: 'CtrlApp'
        })
       
       .otherwise({
           redirectTo: '/home'
       });

}]);



AngApp.controller('MainCtrl', ['$scope', '$http',
  function ($scope, $http) {
    
      $scope.Audio = "";
      $scope.AutoStart = true;
      $scope.Text = '<speak>This is very cool. <prosody rate="x-fast"> I can speak very fast.</prosody></speak>';


    	  var toPost = { Name: 'jorge', Age: 39 };


      _GET($http, "api/GetVoices",  function (data) {

          $scope.Voices = data;
          $scope.VoiceId = data[0].Name;

      });


      $scope.Synthesize = function () {
          if ($scope.VoiceId == null || $scope.VoiceId.length < 3) {
              $scope.Message = 'You must select a voice';
              return;
          }
          $scope.Message = 'Synthesizing...'
          _POST2($http, "api/text-to-speech", { text: $scope.Text, VoiceId : $scope.VoiceId }, function (data) {

              if (data.STATUS == 0) {

                  $('#aud').attr('src', data.DATA);
                  if ($scope.AutoStart) {
                      $('#aud').attr('autoplay', '');
                  }
                  else {
                      $('#aud').removeAttr('autoplay');
                  }
                  $scope.Message = 'Done...';

              }
              else
              {
                  alert(data.MSG);
              }

          });
      }

      //_POST2($http, "WebApi", toPost, function (data) {

      //    alert(JSON.stringify(data));
      //    _POST2($http, "api/text-to-speech", { text : 'My name is jorge'}, function (data) {

      //        alert(JSON.stringify(data));

      //    });

      //});




  }]);
   




// .controller('FormsCtrl', ['$scope',

//      function ($scope) {


//          $scope.$on('$viewContentLoaded', function (event) {

//              $("#example").dataTable({
//                  "bSort": true,
//                  "iDisplayLength": 100,
//                  "aLengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
//                  "bProcessing": true,
//                  "sAjaxSource": 'Commands.aspx?Forms=1'

//              });
//          })
//      }

// ]

//  ).controller('CtrlApp',

//   ['$scope', '$routeParams', '$http', '$rootScope', '$location', '$window',

//          CtrlApp]


//  )
//.controller('CtrlAppsList',

//   ['$scope', '$routeParams', '$location',

//          CtrlAppsList]


//  ).controller('CtrlAdminAllApps', ['$scope',

//      function ($scope) {


//          $scope.$on('$viewContentLoaded', function (event) {

//              $("#example").dataTable({
//                  "bSort": true,
//                  "iDisplayLength": 100,
//                  "aLengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
//                  "bProcessing": true,
//                  "sAjaxSource": 'Commands.aspx?AllApps=1',
//                  "aaSorting": [[3, 'desc']],
//                  "aoColumns": [

//{ "mData": "NamedInsured" },
//{ "mData": "userName" },
//{ "mData": "EffectiveDate" },
//{ "mData": "DateModified" },
//{ "mData": "StatusMessage" },
//{ "mData": "PolicyNumber" },
//{ "mData": "Premium" }
//                  ]

//              }
//              );
//          }
//          );
//      }


//  ])




function _POST2(http, _url, _data, next) {
    http({ method: 'POST', url: _url, data: _data, headers: { 'Content-Type': 'application/json' } }).
  success(function (data, status, headers, config) {
      next(data);
  }).
  error(function (data, status, headers, config) {

      throw new Error('bad post');
  });

}




function _GET(http, _url, next) {
    http({ method: 'GET', url: _url }).
        success(function (data, status, headers, config) {
            next(data);
        }).
        error(function (data, status, headers, config) {

            throw new Error('bad post');
        });

}
