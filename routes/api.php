<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\C_UserController;
use App\Http\Controllers\C_OPTController;
use App\Http\Controllers\C_Authentificator;


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
Route::group(['prefix'=>'/OTH'],function(){
    Route::controller(C_Authentificator::class)->group(function () { 
        Route::post('/auth/generate-secret', 'generateSecret')->name('generateSecret');
        Route::post('/auth/generate-qr-code', 'generateQrCode')->name('generateQrCode');
        Route::post('/auth/verify-authentication', 'verifyAuthentication')->name('verifyAuthentication');
        Route::post('/auth/lier-authentificator', 'lierAuthentificator')->name('lierAuthentificator');
 
    });
});