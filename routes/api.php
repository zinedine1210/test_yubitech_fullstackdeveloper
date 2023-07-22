<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\NestedMenusController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('posts', PostsController::class);

// Nested Menus
Route::get("/nested_menus", [NestedMenusController::class, "getall"]);
Route::post("/nested_menus", [NestedMenusController::class, "store"]);
Route::put("/nested_menus/{id}", [NestedMenusController::class, "edit"]);
Route::delete("/nested_menus/{id}", [NestedMenusController::class, "delete"]);

Route::get("/blog", [BlogController::class, "getall"]);

// COntact
Route::get("/contacts", [ContactController::class, "getall"]);
Route::get("/contacts/search", [ContactController::class, "search"]);
Route::get("/contacts/detail/{id}", [ContactController::class, "show"]);

Route::post("/contacts", [ContactController::class, "store"]);
Route::put("/contacts/{id}", [ContactController::class, "update"]);
Route::delete("/contacts/{id}", [ContactController::class, "destroy"]);

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('register', [AuthController::class, "register"]);
    Route::post('login', [AuthController::class, "login"]);
    Route::post('logout', [AuthController::class, "logout"]);
    Route::post('refresh', [AuthController::class, "refresh"]);
    Route::post('me', [AuthController::class, "me"]);
});