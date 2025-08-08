<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GraduationController extends Controller
{
    /**
     * Display the graduation check form and results.
     */
    public function index(Request $request)
    {
        $student = null;
        $searched = false;

        if ($request->filled('nisn')) {
            $searched = true;
            $nisn = $request->get('nisn');
            $student = Student::where('nisn', $nisn)->first();
        }

        // Get statistics for display
        $stats = [
            'total' => Student::count(),
            'lulus' => Student::where('status', 'lulus')->count(),
            'tidak_lulus' => Student::where('status', 'tidak_lulus')->count(),
        ];

        return Inertia::render('graduation/check', [
            'student' => $student,
            'searched' => $searched,
            'nisn' => $request->get('nisn', ''),
            'stats' => $stats,
        ]);
    }

    /**
     * Display graduation statistics and announcements.
     */
    public function show()
    {
        // Get recent graduates
        $recentGraduates = Student::where('status', 'lulus')
            ->latest()
            ->take(10)
            ->get();

        // Get statistics by class and major
        $statsByClass = Student::selectRaw('class, status, COUNT(*) as count')
            ->groupBy('class', 'status')
            ->get()
            ->groupBy('class');

        $statsByMajor = Student::selectRaw('major, status, COUNT(*) as count')
            ->groupBy('major', 'status')
            ->get()
            ->groupBy('major');

        // Overall statistics
        $overallStats = [
            'total' => Student::count(),
            'lulus' => Student::where('status', 'lulus')->count(),
            'tidak_lulus' => Student::where('status', 'tidak_lulus')->count(),
            'percentage_lulus' => Student::count() > 0 
                ? round((Student::where('status', 'lulus')->count() / Student::count()) * 100, 2)
                : 0,
        ];

        return Inertia::render('graduation/announcements', [
            'recentGraduates' => $recentGraduates,
            'statsByClass' => $statsByClass,
            'statsByMajor' => $statsByMajor,
            'overallStats' => $overallStats,
        ]);
    }
}