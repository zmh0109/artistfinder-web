// js/services/todos.js
angular.module('demoServices', [])
    .factory('Artists', function($http, $window){
        return {
            getTopN: function(n, callback){
                var baseUrl = "http://localhost:4000";
                $http.get(baseUrl+'/api/artists?sort={\"favCount\":-1}&limit='+n.toString()).success(function(data){
                    callback(data);
                });
            },
            getRecentlyAddedN: function(n, callback){
                var baseUrl = "http://localhost:4000";
                $http.get(baseUrl+'/api/changelogs?sort={\"date\":1}&where={\"operation\": \"post\", \"model\": \"artist\"}&limit='+n.toString()).success(function(data){
                    callback(data);
                });
            },
            getById: function(id, callback){
                var baseUrl = "http://localhost:4000";
                $http.get(baseUrl+'/api/artists?where={\"_id\":\"' + id + '\"}').success(function(data){
                    callback(data);
                });
            },
            getArtistById: function(id, callback){
                var baseUrl = "http://localhost:4000";
                $http.get(baseUrl+'/api/artists/' + id).success(function(data){
                    callback(data);
                });
            }
        }
    })
    .factory('Users', function($http, $window){
        return{
            // getUsers: function(callback){
            //     var baseUrl = "http://localhost:4000";
            //     $http.get(baseUrl+'api/users/').success(function(data){
            //         callback(data);
            //     });
            // },
            getUserById: function(userID, callback){
                var baseUrl = "http://localhost:4000";
                $http.get(baseUrl+'/api/users/' + userID).success(function(data){
                    callback(data);
                });
            },
            updateUser: function(data, callback){
                var baseUrl = "http://localhost:4000";
                $http.put(baseUrl+'/api/users/' + data._id, $.param(data)).success(function(){
                    callback();
                });
            },
            deleteUser: function(userID, callback){
                var baseUrl = "http://localhost:4000";
                $http.delete(baseUrl+'/api/users/'+userID).success(function(){
                    callback();
                });
            }
        }
    })
    .factory('Albums', function($http, $window){
        return{
            getByArtist : function(artistId, callback){
                var baseUrl = "http://localhost:4000";
                $http.get(baseUrl+'/api/albums?where={\"artistId\":\"' + artistId + '\"}').success(function(data){
                    callback(data);
                });
            }
        }
    })
    ;
