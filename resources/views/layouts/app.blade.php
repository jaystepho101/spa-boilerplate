<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}" defer></script>
    <script>
    let Apikey = 'ed482dc1b01211a8d1f62865a9c0598742229a0f';
    var appId = (function(c) { for (var a = document.getElementsByTagName("meta"), b = 0;b < a.length;b++) {
      if (c == a[b].name || c == a[b].getAttribute("content")) { return a[b].content; } } return false;
    })("csrf-token");
    </script>

    <!-- Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>

    <div id="app">
      @yield('content')
    </div>

    <script src="/js/laroute.js"></script>
</body>
</html>
