import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Users, Trophy, TrendingUp, School } from 'lucide-react';

interface Student {
    id: number;
    nisn: string;
    name: string;
    class: string;
    major: string;
    score: number;
    status: string;
    created_at: string;
}

interface OverallStats {
    total: number;
    lulus: number;
    tidak_lulus: number;
    percentage_lulus: number;
}

interface StatsByGroup {
    [key: string]: {
        [status: string]: { count: number }[];
    };
}

interface Props {
    recentGraduates: Student[];
    statsByClass: StatsByGroup;
    statsByMajor: StatsByGroup;
    overallStats: OverallStats;
    [key: string]: unknown;
}

export default function GraduationAnnouncements({ 
    recentGraduates, 
    statsByClass, 
    statsByMajor, 
    overallStats 
}: Props) {
    
    const getClassStats = (className: string) => {
        const classData = statsByClass[className];
        if (!classData) return { lulus: 0, tidak_lulus: 0, total: 0 };
        
        const lulus = classData.lulus?.[0]?.count || 0;
        const tidak_lulus = classData.tidak_lulus?.[0]?.count || 0;
        return { lulus, tidak_lulus, total: lulus + tidak_lulus };
    };

    const getMajorStats = (majorName: string) => {
        const majorData = statsByMajor[majorName];
        if (!majorData) return { lulus: 0, tidak_lulus: 0, total: 0 };
        
        const lulus = majorData.lulus?.[0]?.count || 0;
        const tidak_lulus = majorData.tidak_lulus?.[0]?.count || 0;
        return { lulus, tidak_lulus, total: lulus + tidak_lulus };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">
                                <Button variant="outline" className="mb-4">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Kembali ke Beranda
                                </Button>
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                📊 Statistik & Pengumuman Kelulusan
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Data lengkap kelulusan siswa SMA tahun ini
                            </p>
                        </div>
                        <Link href="/login">
                            <Button>
                                👨‍💼 Login Staff
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Overall Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                                    <p className="text-2xl font-bold text-gray-900">{overallStats.total}</p>
                                </div>
                                <Users className="w-8 h-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Lulus</p>
                                    <p className="text-2xl font-bold text-green-600">{overallStats.lulus}</p>
                                </div>
                                <Trophy className="w-8 h-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Tidak Lulus</p>
                                    <p className="text-2xl font-bold text-red-600">{overallStats.tidak_lulus}</p>
                                </div>
                                <School className="w-8 h-8 text-red-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Tingkat Kelulusan</p>
                                    <p className="text-2xl font-bold text-indigo-600">{overallStats.percentage_lulus}%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-indigo-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress Bar */}
                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                                <span>Tingkat Kelulusan Keseluruhan</span>
                                <span>{overallStats.percentage_lulus}%</span>
                            </div>
                            <Progress value={overallStats.percentage_lulus} className="h-3" />
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>{overallStats.lulus} Lulus</span>
                                <span>{overallStats.tidak_lulus} Tidak Lulus</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Statistics by Class */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                🏫 Statistik per Kelas
                            </CardTitle>
                            <CardDescription>
                                Distribusi kelulusan berdasarkan kelas
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.keys(statsByClass).map((className) => {
                                const stats = getClassStats(className);
                                const percentage = stats.total > 0 ? Math.round((stats.lulus / stats.total) * 100) : 0;
                                
                                return (
                                    <div key={className} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold">{className}</span>
                                            <span className="text-sm text-gray-600">{percentage}%</span>
                                        </div>
                                        <Progress value={percentage} className="h-2 mb-2" />
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span>✅ {stats.lulus} Lulus</span>
                                            <span>❌ {stats.tidak_lulus} Tidak Lulus</span>
                                            <span>📊 Total: {stats.total}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* Statistics by Major */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                📚 Statistik per Jurusan
                            </CardTitle>
                            <CardDescription>
                                Distribusi kelulusan berdasarkan jurusan
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.keys(statsByMajor).map((majorName) => {
                                const stats = getMajorStats(majorName);
                                const percentage = stats.total > 0 ? Math.round((stats.lulus / stats.total) * 100) : 0;
                                
                                return (
                                    <div key={majorName} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold">{majorName}</span>
                                            <span className="text-sm text-gray-600">{percentage}%</span>
                                        </div>
                                        <Progress value={percentage} className="h-2 mb-2" />
                                        <div className="flex justify-between text-xs text-gray-600">
                                            <span>✅ {stats.lulus} Lulus</span>
                                            <span>❌ {stats.tidak_lulus} Tidak Lulus</span>
                                            <span>📊 Total: {stats.total}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Graduates */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            🎉 Siswa yang Baru Lulus
                        </CardTitle>
                        <CardDescription>
                            10 siswa terakhir yang berhasil lulus
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentGraduates.map((student) => (
                                <div key={student.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-green-900">{student.name}</h4>
                                        <Badge className="bg-green-100 text-green-800">
                                            ⭐ {student.score}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-green-700">
                                        {student.class} • {student.major}
                                    </p>
                                    <p className="text-xs text-green-600 mt-1">
                                        NISN: {student.nisn}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {recentGraduates.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Belum ada data siswa yang lulus
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Congratulations Message */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <CardContent className="p-8 text-center">
                        <div className="text-4xl mb-4">🎊</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Selamat kepada Seluruh Siswa yang Telah Lulus!
                        </h3>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            Pencapaian ini adalah hasil dari kerja keras dan dedikasi yang luar biasa. 
                            Kami bangga dengan prestasi kalian dan yakin kalian akan sukses di jenjang pendidikan selanjutnya.
                        </p>
                        <div className="mt-6">
                            <Link href="/">
                                <Button size="lg" className="mr-4">
                                    🔍 Cek Status Kelulusan
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
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