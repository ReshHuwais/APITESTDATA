'use strict'
var RestRequestExecutor = require('./rest/RestRequestExecutor');
var RestRequest = require('./rest/RestRequest');

class ApiHelperMethods {
    constructor(){
        this.exec = new RestRequestExecutor();
        this.api_headers = {'Content-Type': 'application/json','Accept-Charset':'UTF-8'};
        this.apiLink = 'https://jsonplaceholder.typicode.com/posts'
    }

    executeGetFuntion(apiLink, payload={}, requestMEthod='GET'){
        var deferred = protractor.promise.defer();
        var get_req;
        console.log(apiLink)
        if(Object.keys(payload).length == 0){
            get_req = new RestRequest(apiLink, requestMEthod).withHeaders(this.api_headers);
        }
        else{
            get_req = new RestRequest(apiLink, requestMEthod).withHeaders(this.api_headers).withPayload(payload);
        }
        this.exec.executeRequest(get_req).then(function (response) {
            deferred.fulfill(response);
        });
        console.log(get_req)
        return deferred.promise;
    }

    verifyNoOfRecords(quantity){
        var deferred = protractor.promise.defer();
        var self = this;
        var api_Link;
        if(quantity == 100){
            api_Link = self.apiLink
        }else if(quantity < 100){
            api_Link = self.apiLink+'/'+quantity
        }else if(quantity == 'invalidposts'){
            api_Link = 'https://jsonplaceholder.typicode.com/invalidposts';
        }
        self.executeGetFuntion(api_Link).then(function(result){
            if(global.responseStatusCode == 200){
                var count = result instanceof Array ? result.length:result.id
                console.log('Number Of Records: ',count)
                console.log('Response Status: ',global.responseStatusCode)
                expect(200).toEqual(global.responseStatusCode);
                expect(quantity).toEqual(count);
                deferred.fulfill(count);
            }else{
                console.log('Request: ',api_Link)
                console.log('Response: ',result)
                console.log('Response Status: ',global.responseStatusCode)
                deferred.fulfill({"Request ":api_Link,"Response":result});
            }
        })
        
        return deferred.promise;
    }

    createRecord(payload){
        var deferred = protractor.promise.defer();
        this.executeGetFuntion(this.apiLink, payload, 'POST').then(function(response){
            deferred.fulfill(response);
        })
        return deferred.promise;
    }

    updateData(payload={}){
        var deferred = protractor.promise.defer();
        var apiLink = this.apiLink+'/1'
        console.log(apiLink)
        this.executeGetFuntion(apiLink, payload, 'PUT').then(function(response){
            deferred.fulfill(response);
        })
        return deferred.promise;
    }
    deleteRecord(id=1){
        var deferred = protractor.promise.defer();
        var apiLink = this.apiLink+'/'+id
        console.log(apiLink)
        this.executeGetFuntion(apiLink, {}, 'DELETE').then(function(response){
            deferred.fulfill(response);
        })
        return deferred.promise;
    }

    
}
module.exports = ApiHelperMethods;
