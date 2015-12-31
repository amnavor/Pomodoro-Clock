var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {
  $scope.sessionType = "Session";
  $scope.sessionLength = ($scope.sessionLength > 0 ? $scope.sessionLength : 25);
  $scope.breakLength = ($scope.breakLength > 0 ? $scope.breakLength : 5);
  $scope.timeLeft = $scope.sessionLength;
  $scope.timerOption = "Start";

  var sec = $scope.sessionLength * 60;
  var run = false;

  //display as HMS
  function HMS(sec) {
    var h = Math.floor(sec / 3600);
    var m = Math.floor(sec % 3600 / 60);
    var s = Math.floor(sec % 3600 % 60);
    return ((h > 0 ? h + ":" : "") + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
  }

  //Switch timer on and off  
  $scope.switchTimer = function() {
    //press START
    if (!run) {
      $scope.timerOption = "Pause";
      timer();
      run = $interval(timer, 100);
      //press PAUSE
    } else {
      $scope.timerOption = "Start";
      $interval.cancel(run);
      run = false;
    }
  }

  //run timer
  function timer() {
    if (sec > 0) {
      sec -= 1;
      $scope.timeLeft = HMS(sec);
    } else {
      var alarm = new Audio('http://oringz.com/oringz-uploads/09_dings.mp3');
      alarm.play();
      if ($scope.sessionType == "Session") {
        $scope.sessionType = "Break";
        $scope.timeLeft = $scope.breakLength;
        sec = 60 * $scope.timeLeft;
      } else {
        $scope.sessionType = "Session";
        $scope.timeLeft = $scope.sessionLength;
        sec = 60 * $scope.timeLeft;
      }
    }
  }

});