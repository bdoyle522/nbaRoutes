var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {

	$scope.teamData = teamData;
	$scope.newGame = {};  				//this will be passed to teamService.addNewGame later
	$scope.showNewGameForm = false;
	

	$scope.toggleNewGameForm = function(){
		$scope.showNewGameForm = !$scope.showNewGameForm;
		console.log($scope);
	}     

	switch($stateParams.team) {
		case 'utahjazz': 
			$scope.homeTeam = 'Utah Jazz';
			$scope.logoPath = 'images/jazz-logo.png';
			break;

		case 'losangeleslakers':
			$scope.homeTeam = 'Los Angeles Lakers';
			$scope.logoPath = 'images/lakers-logo.png';
			break;

		case 'miamiheat':
			$scope.homeTeam = 'Miami Heat';
			$scope.logoPath = 'images/heat-logo.png';
			break;
	}

	$scope.submitGame = function(){
		console.log($scope);
		$scope.newGame.homeTeam = $scope.homeTeam.split('').join('').toLowerCase();
		teamService.addNewGame($scope.newGame).then(function (res){
			teamService.getTeamData($scope.newGame.homeTeam).then(function(data){
				$scope.teamData = data;
				$scope.newGame = {};
				$scope.showNewGameForm = false;
			})
		})
	}

});
