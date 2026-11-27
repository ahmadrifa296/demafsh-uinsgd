<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function (Request $request) {
    if (str_contains((string) $request->userAgent(), 'ELB-HealthChecker')) {
        return response('OK', 200);
    }

    return redirect('/admin');
});
