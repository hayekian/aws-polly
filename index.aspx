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
    <h1>
         <a href="https://github.com/hayekian/aws-polly" target="_blank"><img  src="https://camo.githubusercontent.com/82b228a3648bf44fc1163ef44c62fcc60081495e/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_red_aa0000.png"></a>

        Simple Amazon Polly text-to-speech app 
       
    </h1>
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
