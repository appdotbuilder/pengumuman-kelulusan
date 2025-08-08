import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Users, GraduationCap, BarChart3, Plus, Eye, FileText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🏫 Sistem Pengumuman Kelulusan SMA
                    </h1>
                    <p className="text-gray-600">
                        Panel administrasi untuk mengelola data kelulusan siswa
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/students" className="block">
                            <CardContent className="p-6 text-center">
                                <Users className="w-12 h-12 mx-auto text-blue-500 mb-3" />
                                <h3 className="font-semibold text-lg mb-2">Kelola Siswa</h3>
                                <p className="text-sm text-gray-600">
                                    Tambah, edit, dan hapus data siswa
                                </p>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/students/create" className="block">
                            <CardContent className="p-6 text-center">
                                <Plus className="w-12 h-12 mx-auto text-green-500 mb-3" />
                                <h3 className="font-semibold text-lg mb-2">Tambah Siswa</h3>
                                <p className="text-sm text-gray-600">
                                    Tambahkan data siswa baru
                                </p>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/announcements" className="block">
                            <CardContent className="p-6 text-center">
                                <BarChart3 className="w-12 h-12 mx-auto text-purple-500 mb-3" />
                                <h3 className="font-semibold text-lg mb-2">Statistik</h3>
                                <p className="text-sm text-gray-600">
                                    Lihat statistik kelulusan
                                </p>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/" className="block">
                            <CardContent className="p-6 text-center">
                                <Eye className="w-12 h-12 mx-auto text-orange-500 mb-3" />
                                <h3 className="font-semibold text-lg mb-2">Lihat Publik</h3>
                                <p className="text-sm text-gray-600">
                                    Cek halaman pengumuman publik
                                </p>
                            </CardContent>
                        </Link>
                    </Card>
                </div>

                {/* Information Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <GraduationCap className="w-5 h-5 mr-2" />
                                Tentang Sistem
                            </CardTitle>
                            <CardDescription>
                                Informasi tentang sistem pengumuman kelulusan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    Kelola data kelulusan siswa dengan mudah
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    Siswa dapat mengecek status kelulusan secara mandiri
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    Laporan statistik kelulusan yang komprehensif
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    Interface yang mudah digunakan untuk staff sekolah
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <FileText className="w-5 h-5 mr-2" />
                                Fitur Utama
                            </CardTitle>
                            <CardDescription>
                                Fitur-fitur yang tersedia dalam sistem
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border-l-4 border-green-400 pl-4">
                                    <h4 className="font-medium text-green-700">Pengecekan Status</h4>
                                    <p className="text-sm text-gray-600">
                                        Siswa dapat mengecek status kelulusan menggunakan NISN
                                    </p>
                                </div>
                                <div className="border-l-4 border-blue-400 pl-4">
                                    <h4 className="font-medium text-blue-700">Manajemen Data</h4>
                                    <p className="text-sm text-gray-600">
                                        Staff dapat mengelola data siswa dan status kelulusan
                                    </p>
                                </div>
                                <div className="border-l-4 border-purple-400 pl-4">
                                    <h4 className="font-medium text-purple-700">Laporan Statistik</h4>
                                    <p className="text-sm text-gray-600">
                                        Analisis data kelulusan per kelas dan jurusan
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Links */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent className="p-6 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            🚀 Mulai Gunakan Sistem
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Pilih salah satu aksi di bawah untuk memulai mengelola data kelulusan
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/students/create">
                                <Button size="lg">
                                    ➕ Tambah Siswa Baru
                                </Button>
                            </Link>
                            <Link href="/students">
                                <Button variant="outline" size="lg">
                                    📚 Lihat Semua Data
                                </Button>
                            </Link>
                            <Link href="/" target="_blank">
                                <Button variant="outline" size="lg">
                                    🌐 Buka Halaman Publik
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
