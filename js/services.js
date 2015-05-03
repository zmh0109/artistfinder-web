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
                $http.get(baseUrl+'/api/changelogs?sort={\"date\":-1}&where={\"operation\": \"post\", \"model\": \"artist\"}&limit='+n.toString()).success(function(data){
                    callback(data);
                });
            },
            getById: function(id, callback){
                var baseUrl = "http://localhost:4000";
                $http.get(baseUrl+'/api/artists?where={\"_id\":\"' + id + '\"}').success(function(data){
                    callback(data);
                });
            },
        }
    })
    .factory('CommonData', function(){
        var data = "";
        return{
            getData : function(){
                return data;
            },
            setData : function(newData){
                data = newData;                
            }
        }
    })
    .factory('Llamas', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/llamas');
            }
        }
    })
    ;
