/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//To check if cordova is loaded: if(window.cordova)
//To check if DeviceReady has been fired once: if(isDeviceReady)
var isDeviceReady = false;

var SUCCESS = "Success";
var FAILURE = "Failure";
var EXCEPTION = "Exception";

var app = {
    initialize: function ()
    {
        app.bindEvents();
        app.uiinit();
        app.applyKO();
    },
    bindEvents: function ()
    {
        document.addEventListener("deviceready", app.onDeviceReady, false);
    },
    onDeviceReady: function ()
    {
        isDeviceReady = true;
        $(document).on("pagecontainerchange", function (event, ui)
        {
            if (ui.toPage[0].id == "page_recommendations_home")
            {
                $("#page_recommendations_home_vsd").datebox('setTheDate', appViewModel.page_recommendations_home_vsd).trigger('datebox', { 'method': 'doset' });
                $("#page_recommendations_home_ved").datebox('setTheDate', appViewModel.page_recommendations_home_ved).trigger('datebox', { 'method': 'doset' });
            }
            if (ui.toPage[0].id == "page_recommendations_details")
            {
                $("#page_recommendations_details_tab1").trigger("click");
            }
        });

        appViewModel.username(window.sessionStorage.getItem("username"));

        app.test();
    },
    uiinit: function ()
    {
        $(function ()
        {
            $("[data-role='footer']").html("<h4 class='ui-title' role='heading' aria-level='1'>&copy; " + new Date().getFullYear() + "</h4>");
            $("body>[data-role='panel']").panel().enhanceWithin();
        });
    },
    applyKO: function ()
    {
        ko.applyBindings(appViewModel);
    },
    test: function ()
    {

    },
    openPanel: function ()
    {
        if (appViewModel.username() == null)
        {
            $("#leftpanel1").panel("open");
        }
        else
        {
            $("#leftpanel2").panel("open");
        }
    },
    gotoNotification: function ()
    {
        //navigator.notification.alert("Travel Buddy - It is time for your next vacation", app.gotoNotificationDismissed, "Travel Buddy");
        app.gotoNotificationDismissed();
    },
    gotoNotificationDismissed: function ()
    {
        app.testLoginInitialize();
        app.gotoRecommendationsHome();
    },
    gotoLogin: function ()
    {
        $.mobile.changePage("#page_login", { transition: "slideup", changeHash: false });
    },
    gotoHome: function ()
    {
        $.mobile.changePage("#page_home", { transition: "slidedown", changeHash: false });
    },
    gotoRecommendationsHome: function ()
    {
        $.mobile.changePage("#page_recommendations_home", { transition: "slidefade", changeHash: false });
    },
    gotoRecommendationsHomeCustom: function ()
    {
        $.mobile.changePage("#page_recommendations_home_custom", { transition: "slidefade", changeHash: false });
    },
    gotoRecommendationsDetails: function ()
    {
        $.mobile.changePage("#page_recommendations_details", { transition: "slidefade", changeHash: false });
    },
    gotoPrivacyPolicy: function ()
    {
        $.mobile.changePage("#page_privacy_policy", { transition: "slidefade", changeHash: false });
    },
    gotoSettings: function ()
    {
        $.mobile.changePage("#page_settings", { transition: "slidefade", changeHash: false });
    },
    gotoRecommendationsTravel: function ()
    {
        $.mobile.changePage("#page_recommendations_travel", { transition: "slidefade", changeHash: false });
    },
    gotoRecommendationsFood: function ()
    {
        $.mobile.changePage("#page_recommendations_food", { transition: "slidefade", changeHash: false });
    },
    testLoginInitialize: function ()
    {
        appViewModel.username("TestUser");
        window.sessionStorage.setItem("username", appViewModel.username());

        appViewModel.place("South India");
        appViewModel.placeLink("https://en.wikipedia.org/wiki/South_India");
        appViewModel.page_recommendations_home_vsd = new Date("Jan 1, 2016");
        appViewModel.page_recommendations_home_ved = new Date("Jan 3, 2016");
    },
    testLoginSuccess: function ()
    {
        app.testLoginInitialize();

        app.gotoHome();
    },
    testLogout: function ()
    {
        appViewModel.username(null);
        window.sessionStorage.setItem("username", null);
        $.mobile.changePage("#page_login", { transition: "slideup", changeHash: false });
    },
    loginSuccess: function (x)
    {
        FB.api('/me', function (response)
        {
            appViewModel.username(response.name);
            window.sessionStorage.setItem("username", appViewModel.username());

            appViewModel.place("South India");
            appViewModel.placeLink("https://en.wikipedia.org/wiki/South_India");
            appViewModel.page_recommendations_home_vsd = new Date("Jan 1, 2016");
            appViewModel.page_recommendations_home_ved = new Date("Jan 3, 2016");

            app.gotoHome();
        });
    },
    loginFailure: function (x)
    {
        navigator.notification.alert("Please enter valid credentials!", null, "Login Failure");
    },
    logout: function ()
    {
        FB.logout(function (response)
        {
            appViewModel.username(null);
            window.sessionStorage.setItem("username", null);
            $.mobile.changePage("#page_login", { transition: "slideup", changeHash: false });
        });
    }
};

var appViewModel = {
    username: ko.observable(null),
    place: ko.observable(null),
    placeLink: ko.observable(null),
    page_recommendations_home_vsd: ko.observable(null),
    page_recommendations_home_ved: ko.observable(null),
    page_recommendations_home_custom_location: ko.observable(null),
    page_recommendations_home_custom_vsd: ko.observable(null),
    page_recommendations_home_custom_ved: ko.observable(null)
};

var ServiceURLLocalhost = "http://localhost:81";
var ServiceURLLocalhostIP = "http://192.168.1.250:81";
var ServiceURLRemote = "http://singit.azurewebsites.net";

var services = {
    AllServices: function (methodName, InputData, successCB, errorCB)
    {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: ServiceURLLocalhostIP + "/AllServices.svc/" + methodName,
            data: InputData,
            dataType: "json",
            success: successCB,
            error: errorCB
        });
    },
    serviceTest: function ()
    {
        services.AllServices("TestValidate", JSON.stringify({ username: "anuj", password: "anuj" }), services.successTest, services.errorTest);
    },
    successTest: function (x)
    {
        alert(JSON.stringify(x));
    },
    errorTest: function (x)
    {
        alert(JSON.stringify(x));
    }
};