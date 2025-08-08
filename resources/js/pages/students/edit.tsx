import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Student {
    id: number;
    nisn: string;
    name: string;
    class: string;
    major: string;
    score: number;
    status: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    student: Student;
    [key: string]: unknown;
}

export default function EditStudent({ student }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nisn: student.nisn,
        name: student.name,
        class: student.class,
        major: student.major,
        score: student.score.toString(),
        status: student.status,
        notes: student.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/students/${student.id}`);
    };

    const classes = [
        'XII IPA 1', 'XII IPA 2', 'XII IPA 3',
        'XII IPS 1', 'XII IPS 2', 'XII IPS 3',
        'XII Bahasa'
    ];

    const majors = ['IPA', 'IPS', 'Bahasa'];

    return (
        <AppShell>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Link href={`/students/${student.id}`}>
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">✏️ Edit Data Siswa</h1>
                        <p className="text-gray-600">Perbarui data siswa: {student.name}</p>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Form Edit Data Siswa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* NISN */}
                            <div>
                                <Label htmlFor="nisn">NISN *</Label>
                                <Input
                                    id="nisn"
                                    type="text"
                                    maxLength={10}
                                    placeholder="Masukkan 10 digit NISN"
                                    value={data.nisn}
                                    onChange={(e) => setData('nisn', e.target.value)}
                                    className={errors.nisn ? 'border-red-500' : ''}
                                />
                                {errors.nisn && (
                                    <p className="text-red-500 text-sm mt-1">{errors.nisn}</p>
                                )}
                            </div>

                            {/* Name */}
                            <div>
                                <Label htmlFor="name">Nama Lengkap *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Masukkan nama lengkap siswa"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Class */}
                                <div>
                                    <Label htmlFor="class">Kelas *</Label>
                                    <Select value={data.class} onValueChange={(value) => setData('class', value)}>
                                        <SelectTrigger className={errors.class ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih kelas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classes.map((className) => (
                                                <SelectItem key={className} value={className}>
                                                    {className}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.class && (
                                        <p className="text-red-500 text-sm mt-1">{errors.class}</p>
                                    )}
                                </div>

                                {/* Major */}
                                <div>
                                    <Label htmlFor="major">Jurusan *</Label>
                                    <Select value={data.major} onValueChange={(value) => setData('major', value)}>
                                        <SelectTrigger className={errors.major ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih jurusan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {majors.map((major) => (
                                                <SelectItem key={major} value={major}>
                                                    {major}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.major && (
                                        <p className="text-red-500 text-sm mt-1">{errors.major}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Score */}
                                <div>
                                    <Label htmlFor="score">Nilai Akhir *</Label>
                                    <Input
                                        id="score"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                        placeholder="0.00"
                                        value={data.score}
                                        onChange={(e) => setData('score', e.target.value)}
                                        className={errors.score ? 'border-red-500' : ''}
                                    />
                                    {errors.score && (
                                        <p className="text-red-500 text-sm mt-1">{errors.score}</p>
                                    )}
                                </div>

                                {/* Status */}
                                <div>
                                    <Label htmlFor="status">Status Kelulusan *</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="lulus">Lulus</SelectItem>
                                            <SelectItem value="tidak_lulus">Tidak Lulus</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                                    )}
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <Label htmlFor="notes">Catatan</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Catatan tambahan (opsional)"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                    className={errors.notes ? 'border-red-500' : ''}
                                />
                                {errors.notes && (
                                    <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-4">
                                <Link href={`/students/${student.id}`}>
                                    <Button variant="outline" type="button">
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? 'Menyimpan...' : 'Perbarui Data'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="bg-amber-50 border-amber-200">
                    <CardContent className="p-4">
                        <h4 className="font-semibold text-amber-900 mb-2">⚠️ Peringatan</h4>
                        <ul className="text-sm text-amber-800 space-y-1">
                            <li>• Pastikan data yang diubah sudah benar sebelum menyimpan</li>
                            <li>• Perubahan status kelulusan akan mempengaruhi pengumuman publik</li>
                            <li>• Backup data penting sebelum melakukan perubahan besar</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}