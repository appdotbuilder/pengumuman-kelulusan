<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Student::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('nisn', 'LIKE', "%{$search}%")
                  ->orWhere('class', 'LIKE', "%{$search}%")
                  ->orWhere('major', 'LIKE', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }

        // Filter by class
        if ($request->filled('class') && $request->get('class') !== 'all') {
            $query->where('class', $request->get('class'));
        }

        // Filter by major
        if ($request->filled('major') && $request->get('major') !== 'all') {
            $query->where('major', $request->get('major'));
        }

        $students = $query->latest()->paginate(15)->withQueryString();

        // Get filter options
        $classes = Student::distinct()->pluck('class')->sort()->values();
        $majors = Student::distinct()->pluck('major')->sort()->values();

        return Inertia::render('students/index', [
            'students' => $students,
            'filters' => [
                'search' => $request->get('search', ''),
                'status' => $request->get('status', 'all'),
                'class' => $request->get('class', 'all'),
                'major' => $request->get('major', 'all'),
            ],
            'filterOptions' => [
                'classes' => $classes,
                'majors' => $majors,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('students/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $student = Student::create($request->validated());

        return redirect()->route('students.show', $student)
            ->with('success', 'Data siswa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return Inertia::render('students/show', [
            'student' => $student
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return Inertia::render('students/edit', [
            'student' => $student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());

        return redirect()->route('students.show', $student)
            ->with('success', 'Data siswa berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Data siswa berhasil dihapus.');
    }
}