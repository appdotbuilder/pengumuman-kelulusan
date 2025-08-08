<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nisn' => 'required|string|size:10|unique:students,nisn',
            'name' => 'required|string|max:255',
            'class' => 'required|string|max:50',
            'major' => 'required|string|max:50',
            'score' => 'required|numeric|min:0|max:100',
            'status' => 'required|in:lulus,tidak_lulus',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nisn.required' => 'NISN wajib diisi.',
            'nisn.size' => 'NISN harus terdiri dari 10 digit.',
            'nisn.unique' => 'NISN sudah terdaftar.',
            'name.required' => 'Nama siswa wajib diisi.',
            'class.required' => 'Kelas wajib diisi.',
            'major.required' => 'Jurusan wajib diisi.',
            'score.required' => 'Nilai wajib diisi.',
            'score.numeric' => 'Nilai harus berupa angka.',
            'score.min' => 'Nilai minimal 0.',
            'score.max' => 'Nilai maksimal 100.',
            'status.required' => 'Status kelulusan wajib dipilih.',
            'status.in' => 'Status kelulusan tidak valid.',
        ];
    }
}