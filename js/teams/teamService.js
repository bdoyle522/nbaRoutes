var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {

    this.addNewGame = function(gameObj){
        var v = gameObj.homeTeam.split('').join('');
        var indx = v.indexOf(' ');
        var home = gameObj.homeTeam(indx,1);
        console.log(home);
    	var url = 'https://api.parse.com/1/classes/' + home;
        console.log(url);
    	if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)){
    		var won = true;
    	} else{
    		var won = false;
    	}
    	return $http({
    		method: 'POST',
    		url: url,
    		data: gameObj
    	})
    }

    this.getTeamData = function(team){
    	var deferred = $q.defer();
    	var url = 'https://api.parse.com/1/classes/' + team;
    	$http({
    		method: 'GET',
    		url: url,
    	}).then(function(data){
    		var results = data.data.results;
    		var wins = 0;
    		var losses = 0;
    		for(var i = 0; i < results.length; i++){
    			if(results[i].won === true){
    				wins++;
    			} else {
    				losses++;
    			}
    		}
    		results.wins = wins;
    		results.losses = losses;
    		deferred.resolve(results);
    	})
    	return deferred.promise;
    }



});