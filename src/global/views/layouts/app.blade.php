<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Proyecto SET' }}</title>

    {{-- CSS global --}}
    <link rel="stylesheet" href="/styles.css">
</head>

<body>

    {{-- Barra superior fija --}}
    @include('components.nav')

    <main class="container">
        @yield('content')
    </main>

</body>
</html>
