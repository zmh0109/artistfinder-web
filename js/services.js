var baseUrl = "http://localhost:4000/api";

// js/services/todos.js
angular.module('demoServices', [])
    .factory('Artists', function($http, $window){
        return {
            getTop: function(n, callback){
                $http.get(baseUrl+'/artists?sort={\"favCount\":-1}&limit='+n.toString()).success(function(data){
                    callback(data);
                });
            },
            getRecent: function(n, callback){
                $http.get(baseUrl+'/changelogs?sort={\"date\":-1}&where={\"operation\": \"post\", \"model\": \"artist\"}&limit='+n.toString()).success(function(data){
                    callback(data);
                });
            },
            getById: function(id, callback){
                $http.get(baseUrl+'/artists/' + id).success(function(data){
                    callback(data);
                });
            },
            update: function(data, callback){
                $http.put(baseUrl+'/artists/' + data._id, $.param(data)).success(function(){
                    callback();
                });
            },
            delete: function(artistId, userId, callback){
                $http.delete(baseUrl+'/artists/' + artistId, $.param({'userId':userId})).success(function(){
                    callback();
                });
            },
            get: function(callback){
                $http.get(baseUrl+'/artists').success(function(data){
                    callback(data);
                });
            }, 
            post: function(data, callback) {
                $http.post(baseUrl+'/artists', $.param(data)).success(function (data) {
                    callback(data);
                });
            }
        }
    })
    .factory('Users', function($http, $window){
        return{
            getById: function(userID, callback){
                $http.get(baseUrl+'/users/' + userID).success(function(data){
                    callback(data);
                });
            },
            update: function(data, callback){
                $http.put(baseUrl+'/users/' + data._id, $.param(data)).success(function(){
                    callback();
                });
            },
            delete: function(userID, callback){
                $http.delete(baseUrl+'/users/'+userID).success(function(){
                    callback();
                });
            },
            signup: function(user, callback) {
                $http.post(baseUrl+'/signup', $.param(user)).success(function(data){
                    callback(data);  
                }); 
            },
            signin: function(user, callback) {
                $http.post(baseUrl+'/signin', $.param(user)).success(function(data){
                    callback(data);  
                }); 
            }
        }
    })
    .factory('Albums', function($http, $window){
        return{
            getByArtist : function(artistId, callback){
                $http.get(baseUrl+'/albums?where={\"artistId\":\"' + artistId + '\"}').success(function(data){
                    callback(data);
                });
            },
            getById: function(id, callback) {
                $http.get(baseUrl+'/albums/'+id).success(function(data) {
                    callback(data);
                });
            },
            update: function(data, callback){
                $http.put(baseUrl+'/albums/' + data._id, $.param(data)).success(function(){
                    callback();
                });
            },
            delete: function(userId, callback){
                $http.delete(baseUrl+'/albums/'+userId).success(function(){
                    callback();
                });
            },
        }
    })
    ;
