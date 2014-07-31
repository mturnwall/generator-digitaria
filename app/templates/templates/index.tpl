<!doctype html>
<html class="no-js" lang="en-us">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><%= projectName %></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- @if NODE_ENV='dev' -->
    <link rel="stylesheet" href="/css/master.css">
    <!-- @endif -->

    <!-- @if NODE_ENV='production' -->
    <link rel="stylesheet" href="/build/css/master.min.css">
    <!-- @endif -->

    <!-- @if NODE_ENV='dev' -->
    <script src="/js/libs/modernizr.js"></script>
    <!-- @endif -->
</head>
<body>
    <!--[if lt IE 8]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!-- Begin: Masthead -->
    <header id="masthead">

    </header>
    <!-- End: Masthead -->

    <!-- Begin: Main Container -->
    <div id="container">

    </div>
    <!-- End: Main Container -->

    <!-- Begin: Footer -->
    <footer id="globalFooter">

    </footer>
    <!-- End: Footer -->

    <!-- @if NODE_ENV='dev' -->
    <script src="/js/libs/jquery.js"></script>
    <% if (includeUniform) { %><script src="/js/libs/jquery.uniform.js"></script><% } %>
    <script src="/js/<%= slugProjectName %>.js"></script>
    <!-- @endif -->

    <!-- @if NODE_ENV='production' -->
    <script src="/build/js/libs.min.js"></script>
    <script src="/build/js/<%= slugProjectName %>.min.js"></script>
    <!-- @endif -->

</body>
</html>
