<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\C_UserController;
use App\Http\Controllers\C_OPTController;


Route::group(['prefix'=>'/user'],function(){
    Route::controller(C_UserController::class)->group(function () {
    Route::post('/auth/me', 'postuser')->name('postuser');
    Route::post('/auth/adduser', 'addnameuser')->name('addnameuser');
});
});


Route::group(['prefix'=>'/OPT'],function(){
    Route::controller(C_OPTController::class)->group(function () {
    Route::post('/auth/verify-otp','PostverifyOPT')->name('PostverifyOPT');
    });
});