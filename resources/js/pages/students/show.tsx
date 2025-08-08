import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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

export default function ShowStudent({ student }: Props) {
    const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus data ${student.name}?`)) {
            router.delete(`/students/${student.id}`, {
                onSuccess: () => {
                    // Will redirect to students index
                }
            });
        }
    };

    const getStatusBadge = (status: string) => {
        if (status === 'lulus') {
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-lg px-4 py-2">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    LULUS
                </Badge>
            );
        }
        return (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200 text-lg px-4 py-2">
                <XCircle className="w-5 h-5 mr-2" />
                TIDAK LULUS
            </Badge>
        );
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 80) return 'text-blue-600';
        if (score >= 75) return 'text-yellow-600';
        return 'text-red-600';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppShell>
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/students">
                            <Button variant="outline">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">👤 Detail Siswa</h1>
                            <p className="text-gray-600">Informasi lengkap data siswa</p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={`/students/${student.id}/edit`}>
                            <Button>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                        <Button 
                            variant="outline"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                        </Button>
                    </div>
                </div>

                {/* Student Info */}
                <Card>
                    <CardContent className="p-8">
                        <div className="text-center space-y-6">
                            {/* Status Badge */}
                            <div className="text-6xl mb-4">
                                {student.status === 'lulus' ? '🎉' : '😔'}
                            </div>
                            
                            {/* Name and Status */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    {student.name}
                                </h2>
                                <div className="flex justify-center mb-6">
                                    {getStatusBadge(student.status)}
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left bg-gray-50 rounded-lg p-6">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">NISN</p>
                                        <p className="text-lg font-semibold text-gray-900">{student.nisn}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Kelas</p>
                                        <p className="text-lg font-semibold text-gray-900">{student.class}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Jurusan</p>
                                        <p className="text-lg font-semibold text-gray-900">{student.major}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Nilai Akhir</p>
                                        <p className={`text-2xl font-bold ${getScoreColor(student.score)}`}>
                                            {student.score}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {student.notes && (
                                <Alert>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>Catatan:</strong> {student.notes}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Status Message */}
                            {student.status === 'lulus' ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                    <div className="flex items-center justify-center space-x-2 text-green-800 font-medium">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>Siswa ini telah dinyatakan LULUS</span>
                                    </div>
                                    <p className="text-green-700 text-sm mt-2">
                                        Memenuhi syarat untuk melanjutkan ke jenjang pendidikan berikutnya
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                    <div className="flex items-center justify-center space-x-2 text-red-800 font-medium">
                                        <XCircle className="w-5 h-5" />
                                        <span>Siswa ini dinyatakan TIDAK LULUS</span>
                                    </div>
                                    <p className="text-red-700 text-sm mt-2">
                                        Belum memenuhi syarat kelulusan yang ditetapkan
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Metadata */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">📋 Informasi Sistem</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-600">Data dibuat pada:</p>
                                <p className="font-medium">{formatDate(student.created_at)}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Terakhir diperbarui:</p>
                                <p className="font-medium">{formatDate(student.updated_at)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-center space-x-4 pt-6">
                    <Link href="/students">
                        <Button variant="outline" size="lg">
                            📚 Lihat Semua Siswa
                        </Button>
                    </Link>
                    <Link href={`/students/${student.id}/edit`}>
                        <Button size="lg">
                            ✏️ Edit Data Siswa
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}