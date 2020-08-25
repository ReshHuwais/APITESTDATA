'use strict'
class RestRequest {

    /**
        Class abstracting a REST request 
        @constructor 
        @param {string} requestUrl - The URL of the REST api to pass the request to 
        @param {string} requestType - The Request Type - GET/POST/PUT/DELETE
    */
    constructor(requestUrl, requestType) {
        this.requestObject = {};
        this.requestObject.requestUrl = requestUrl;
        this.requestObject.requestType = requestType;
    }

    /**
        Pass the request with headers 
        @param {string} headers - JSON string representing header 
        For example 
        var headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
        }
    */
    withHeaders(headers) {
        this.requestObject.headers = headers;
        return this;
    }

    /**
        Create the request with auth informnation 
        @param {string} username - username 
        @param {string} password - password 
        Note that currently we support only basic auth 
    */
    withAuth(username, password) {
        this.requestObject.username = username;
        this.requestObject.password = password;
        return this;
    }

    /**
        Add payload data to this request 
        @param {string} - JSON string representing the payload data 
        var payload = {
            "UserName": "bhar_1205rrkmkkk",
            "Password": "Sample@12344",
            "FirstName": "qa",
            "LastName": "tester"
        }
    */
    withPayload(payload) {
        this.requestObject.payload = payload;
        return this;
    }

    /**
        get the request object constructed . This will be used by the RestRequestExecutor
    */
    getRequestObject() {
        return this.requestObject;
    }
}

module.exports = RestRequest;
