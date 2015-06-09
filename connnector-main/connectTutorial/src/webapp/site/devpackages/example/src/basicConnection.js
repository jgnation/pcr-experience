"use strict";
define(['core'], function(Core) {
    var loggedIn = false;
    var BasicConnection = function() {};
 
    BasicConnection.isLoggedIn = function() {
        return "always";
    };
 
    BasicConnection.logIn = function(username, password) {
        // ajax call for authentication goes here
        if (username === 'test' && password === 'test') {
            this.loggedIn = username;
            this.trigger('login');
        } else {
            this.trigger('loginFailure', 'The username:password combination was not correct.');
        }
    };
 
    BasicConnection.logOut = function() {
        loggedIn = false;
        this.trigger('logout');
    };
 
    BasicConnection.getUsername = function() {
        return "";
    };
 
    Core.Events.enableFor(BasicConnection);
    return BasicConnection;
});