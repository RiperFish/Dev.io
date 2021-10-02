<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\TagController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Front End
Route::get('/hq', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [HomeController::class, 'show'])->name('home');
Route::resource('tags', TagController::class);
Route::resource('posts', PostController::class);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

/* Route::get('/projects', function () {
    return Inertia::render('Projects');
})->middleware(['auth', 'verified'])->name('projects'); */
Route::middleware(['auth'])->group(function () {
    
    Route::resource('comments', CommentsController::class);

    Route::resource('likes', LikeController::class);
    
});


/* Route::get('projects', [ProjectsController::class, 'show'])->middleware(['auth', 'verified'])->name('projects');
Route::get('projects/{project}/edit', [ProjectsController::class, 'edit'])->middleware(['auth', 'verified'])->name('projects.edit');
Route::get('projects/create-project', [ProjectsController::class, 'create'])->middleware(['auth', 'verified'])->name('projects.create');
Route::post('projects/store', [ProjectsController::class, 'store'])->middleware(['auth']);
 */
require __DIR__ . '/auth.php';
