'use strict'
var Client = require('node-rest-client').Client;

class RestRequestExecutor {
    /**
        get the request type , Private method used internally to determine and sanitize the type of request         
        @param {string} request - The request to process 
        @return {string} - the request type GET, POST, PUT or DELETE
    */
    getRequestType(request) {
        let requestType = request.requestType.toUpperCase();
        if (requestType === 'GET' || requestType === 'POST' || requestType === 'PUT' || requestType === 'PATCH' || requestType === 'DELETE') {
            return requestType;
        }
        throw 'The request type ' + requestType + ' is not supported!';
    }


    /**
        create a new instace of the Rest CLient (node-rest-client) using the passed credentials 
        Private method used internally
        @return {Client} - New instance of the rest client
    */
    getClient(request) {
        let client;
        let username = request.username;
        let password = request.password;
        var options = {};
        if (username && password) {
            options.user = username;
            options.password = password;
        }
        if (options) {
            client = new Client(options);
        } else {
            client = new Client();
        }
        return client;
    }

    /**
        Build payload of this request.
        Private method used internally
        @see https://www.npmjs.com/package/node-rest-client for more details on how to build the request 
        
    */
    buildPayload(request) {
        let args = {};
        let data = request.payload;
        let headers = request.headers;
        if (headers) {
            args.headers = headers;
        }
        if (data) {
            args.data = data;
        }
        return args;
    }
    
    
   

    /**
        The user facing side of the API , Execute a given REST request 
        @return Promise reflecting the execution status of this request 
    */
    executeRequest(restRequest) {
        let request = restRequest.getRequestObject();
        let url = request.requestUrl;
        let requestType = this.getRequestType(request);
        let headers = request.headers;
        let payload = request.payload;
        let client = this.getClient(request);
        let deferred = protractor.promise.defer();
        let args = this.buildPayload(request);
        
        console.log('The args is ' + JSON.stringify(args));
    
        if (requestType === 'GET') {
            console.log('Executing a get with the url ' + url);
            browser.sleep(5000);
            client.get(url, args, function (data, response) {
                global.responseStatusCode = response.statusCode;
                deferred.fulfill(data);
            },function(err){
                console.log('Error: '+err);
            });
        } else if (requestType === 'POST') {
            console.log('Executing a post with the url ' + url);
            browser.sleep(10000);
            client.post(url, args, function (data, response) {
                global.responseStatusCode = response.statusCode;
                console.log('The data is ' + JSON.stringify(data));
                deferred.fulfill(data);
            });
        } else if (requestType === 'PUT') {
            console.log('Executing a put with the url ' + url);
            browser.sleep(5000);
            client.put(url, args, function (data, response) {
                global.responseStatusCode = response.statusCode;
                deferred.fulfill(data);
            });
        }else if (requestType === 'PATCH') {
            console.log('Executing a put with the url ' + url);
            browser.sleep(5000);
            client.patch(url, args, function (data, response) {
                global.responseStatusCode = response.statusCode;
                deferred.fulfill(data);
            });
        }else if (requestType === 'DELETE') {
            console.log('Executing a put with the url ' + url);
            browser.sleep(5000);
            client.delete(url, args, function (data, response) {
                global.responseStatusCode = response.statusCode;
                deferred.fulfill(data);
            });
        }
        return deferred.promise;
    }
}

module.exports = RestRequestExecutor;
