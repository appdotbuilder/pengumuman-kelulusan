<?php

use App\Http\Controllers\GraduationController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public graduation check - main functionality on home page
Route::get('/', [GraduationController::class, 'index'])->name('home');

// Public graduation announcements
Route::get('/announcements', [GraduationController::class, 'show'])->name('announcements');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Student management routes (protected for school staff)
    Route::resource('students', StudentController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
