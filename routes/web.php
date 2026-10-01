<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/about', function () {
    return Inertia::render('AboutPage');
});


Route::get('/{slug}', function (string $slug) {
    $path = resource_path('data/data.json');

    abort_unless(File::exists($path), 404);

    $items = json_decode(File::get($path), true);
    $capability = collect($items)->firstWhere('slug', $slug);

    abort_if(! $capability, 404);

    return Inertia::render('DetailPage', ['capability' => $capability]);
})->where('slug', '[a-z0-9-]+')->name('detailpage.show');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});








require __DIR__.'/auth.php';
