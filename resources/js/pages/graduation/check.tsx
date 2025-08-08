import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { router, Link } from '@inertiajs/react';
import { CheckCircle, XCircle, Users, GraduationCap, AlertCircle, Search } from 'lucide-react';

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

interface Stats {
    total: number;
    lulus: number;
    tidak_lulus: number;
}

interface Props {
    student?: Student | null;
    searched: boolean;
    nisn: string;
    stats: Stats;
    [key: string]: unknown;
}

export default function GraduationCheck({ student, searched, nisn, stats }: Props) {
    const [searchNisn, setSearchNisn] = useState(nisn);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchNisn.trim()) return;
        
        setIsSearching(true);
        router.get('/', { nisn: searchNisn }, {
            preserveState: false,
            onFinish: () => setIsSearching(false),
        });
    };

    const getStatusBadge = (status: string) => {
        if (status === 'lulus') {
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    LULUS
                </Badge>
            );
        }
        return (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                <XCircle className="w-4 h-4 mr-1" />
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center md:justify-start">
                                🎓 Pengumuman Kelulusan SMA
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Masukkan NISN Anda untuk mengecek status kelulusan
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex gap-3">
                            <Link href="/announcements">
                                <Button variant="outline">
                                    📊 Lihat Statistik
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button>
                                    👨‍💼 Login Staff
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <Users className="w-8 h-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Siswa Lulus</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.lulus}</p>
                                </div>
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Tidak Lulus</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.tidak_lulus}</p>
                                </div>
                                <XCircle className="w-8 h-8 text-red-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search Form */}
                <Card className="mb-8">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 mr-2" />
                            Cek Status Kelulusan
                        </CardTitle>
                        <CardDescription>
                            Masukkan NISN (Nomor Induk Siswa Nasional) untuk melihat hasil kelulusan Anda
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="max-w-md mx-auto">
                            <div className="flex gap-3">
                                <Input
                                    type="text"
                                    placeholder="Masukkan NISN (10 digit)"
                                    value={searchNisn}
                                    onChange={(e) => setSearchNisn(e.target.value)}
                                    maxLength={10}
                                    className="flex-1"
                                />
                                <Button type="submit" disabled={isSearching} className="px-6">
                                    {isSearching ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                    ) : (
                                        <Search className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Search Results */}
                {searched && (
                    <Card className="max-w-2xl mx-auto">
                        <CardContent className="p-6">
                            {student ? (
                                <div className="text-center space-y-6">
                                    <div className="text-6xl mb-4">
                                        {student.status === 'lulus' ? '🎉' : '😔'}
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                            {student.name}
                                        </h3>
                                        <div className="flex justify-center mb-4">
                                            {getStatusBadge(student.status)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-gray-50 rounded-lg p-6">
                                        <div>
                                            <p className="text-sm text-gray-600">NISN</p>
                                            <p className="font-semibold">{student.nisn}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Kelas</p>
                                            <p className="font-semibold">{student.class}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Jurusan</p>
                                            <p className="font-semibold">{student.major}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Nilai Akhir</p>
                                            <p className={`font-semibold text-lg ${getScoreColor(student.score)}`}>
                                                {student.score}
                                            </p>
                                        </div>
                                    </div>

                                    {student.notes && (
                                        <Alert>
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>
                                                <strong>Catatan:</strong> {student.notes}
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    {student.status === 'lulus' ? (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <p className="text-green-800 font-medium">
                                                🎊 Selamat! Anda telah dinyatakan LULUS dan berhak melanjutkan ke jenjang pendidikan selanjutnya.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <p className="text-red-800 font-medium">
                                                Maaf, Anda belum memenuhi syarat kelulusan. Silakan hubungi pihak sekolah untuk informasi lebih lanjut.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-4">❓</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Data Tidak Ditemukan
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        NISN yang Anda masukkan tidak ditemukan dalam database siswa.
                                    </p>
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Pastikan NISN yang dimasukkan benar (10 digit) atau hubungi pihak sekolah jika masih mengalami masalah.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Information */}
                {!searched && (
                    <div className="max-w-2xl mx-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center">ℹ️ Informasi Penting</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 text-sm text-gray-600">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-blue-500 font-bold">1.</span>
                                        <p>NISN terdiri dari 10 digit angka yang terdapat pada kartu pelajar Anda.</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-blue-500 font-bold">2.</span>
                                        <p>Hasil kelulusan dapat dicek kapan saja melalui website ini.</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-blue-500 font-bold">3.</span>
                                        <p>Jika mengalami kesulitan, silakan hubungi bagian administrasi sekolah.</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-blue-500 font-bold">4.</span>
                                        <p>Siswa yang dinyatakan lulus dapat melanjutkan proses pendaftaran ke jenjang pendidikan berikutnya.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="mb-2">© 2024 SMA Negeri. Sistem Pengumuman Kelulusan.</p>
                    <p className="text-gray-400 text-sm">
                        Untuk bantuan lebih lanjut, hubungi bagian administrasi sekolah.
                    </p>
                </div>
            </footer>
        </div>
    );
}