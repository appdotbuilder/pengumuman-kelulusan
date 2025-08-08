<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nisn')->unique()->comment('Nomor Induk Siswa Nasional');
            $table->string('name')->comment('Nama lengkap siswa');
            $table->string('class')->comment('Kelas siswa');
            $table->string('major')->comment('Jurusan siswa');
            $table->decimal('score', 5, 2)->comment('Nilai akhir siswa');
            $table->enum('status', ['lulus', 'tidak_lulus'])->comment('Status kelulusan');
            $table->text('notes')->nullable()->comment('Catatan tambahan');
            $table->timestamps();
            
            // Indexes for better performance
            $table->index('nisn');
            $table->index('name');
            $table->index('status');
            $table->index(['status', 'class']);
            $table->index(['major', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};