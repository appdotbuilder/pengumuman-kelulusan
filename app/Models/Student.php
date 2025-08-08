<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Student
 *
 * @property int $id
 * @property string $nisn
 * @property string $name
 * @property string $class
 * @property string $major
 * @property float $score
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Student newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student query()
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereClass($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereMajor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereNisn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student lulus()
 * @method static \Illuminate\Database\Eloquent\Builder|Student tidakLulus()
 * @method static \Database\Factories\StudentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nisn',
        'name',
        'class',
        'major',
        'score',
        'status',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'score' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include graduated students.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLulus($query)
    {
        return $query->where('status', 'lulus');
    }

    /**
     * Scope a query to only include non-graduated students.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeTidakLulus($query)
    {
        return $query->where('status', 'tidak_lulus');
    }

    /**
     * Check if student has graduated.
     *
     * @return bool
     */
    public function hasGraduated(): bool
    {
        return $this->status === 'lulus';
    }

    /**
     * Get formatted status for display.
     *
     * @return string
     */
    public function getFormattedStatusAttribute(): string
    {
        return $this->status === 'lulus' ? 'Lulus' : 'Tidak Lulus';
    }
}