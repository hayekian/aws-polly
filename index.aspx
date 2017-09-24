<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SampleAngular.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Simple Amazon Polly text-to-speech app</title>
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/angular.min.js"></script>
    <script src="js/angular-route.min.js"></script>
    <script src="js/angular-sanitize.min.js"></script>
    <script src="js/AngularApp.js"></script>
   
</head>
<body ng-app="App">
    <h1>Simple Amazon Polly text-to-speech app </h1>
    <div ng-controller="MainCtrl">
        <div id="text-to-speech">
            Select voice:
            <select ng-model="VoiceId" ng-options="item.Name as (item.LanguageName + '('+ item.Name+')') for item in Voices">
                <option value=""></option>
            </select>
            <p />
            Enter text to synthesize: (<a href="http://docs.aws.amazon.com/polly/latest/dg/supported-ssml.html" target="_blank">SSML tags supported by Amazon Polly)</a>
            <p />
            <textarea ng-model="Text" rows="10" cols="80"></textarea>
            <p />
            <button type="button" ng-click="Synthesize()">Synthesize</button>
            <input type="checkbox" ng-model="AutoStart" />
            Auto start
            <p />
            {{Message}}
            <p />
            <audio id="aud" controls />
            <p />
        </div>
    </div>


</body>
</html>
