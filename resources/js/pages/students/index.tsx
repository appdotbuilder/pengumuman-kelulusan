import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, router } from '@inertiajs/react';
import { Plus, Search, Eye, Edit, Trash2, Filter } from 'lucide-react';

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

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface PaginatedStudents {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Filters {
    search: string;
    status: string;
    class: string;
    major: string;
}

interface FilterOptions {
    classes: string[];
    majors: string[];
}

interface Props {
    students: PaginatedStudents;
    filters: Filters;
    filterOptions: FilterOptions;
    [key: string]: unknown;
}

export default function StudentsIndex({ students, filters, filterOptions }: Props) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const params = Object.fromEntries(formData.entries());
        router.get('/students', params, { preserveState: true });
    };

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        router.get('/students', newFilters, { preserveState: true });
    };

    const handleDelete = (student: Student) => {
        if (confirm(`Apakah Anda yakin ingin menghapus data ${student.name}?`)) {
            router.delete(`/students/${student.id}`, {
                onSuccess: () => {
                    // Handle success
                }
            });
        }
    };

    const getStatusBadge = (status: string) => {
        if (status === 'lulus') {
            return <Badge className="bg-green-100 text-green-800">Lulus</Badge>;
        }
        return <Badge className="bg-red-100 text-red-800">Tidak Lulus</Badge>;
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">📚 Manajemen Data Siswa</h1>
                        <p className="text-gray-600">Kelola data kelulusan siswa</p>
                    </div>
                    <Link href="/students/create">
                        <Button className="mt-4 sm:mt-0">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Siswa
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Filter className="w-5 h-5 mr-2" />
                            Filter & Pencarian
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <Input
                                        name="search"
                                        placeholder="Cari nama, NISN, kelas..."
                                        defaultValue={filters.search}
                                    />
                                </div>
                                <div>
                                    <Select
                                        value={filters.status}
                                        onValueChange={(value) => handleFilterChange('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status Kelulusan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Status</SelectItem>
                                            <SelectItem value="lulus">Lulus</SelectItem>
                                            <SelectItem value="tidak_lulus">Tidak Lulus</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Select
                                        value={filters.class}
                                        onValueChange={(value) => handleFilterChange('class', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Kelas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Kelas</SelectItem>
                                            {filterOptions.classes.map((className) => (
                                                <SelectItem key={className} value={className}>
                                                    {className}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Select
                                        value={filters.major}
                                        onValueChange={(value) => handleFilterChange('major', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Jurusan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Jurusan</SelectItem>
                                            {filterOptions.majors.map((majorName) => (
                                                <SelectItem key={majorName} value={majorName}>
                                                    {majorName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">
                                    <Search className="w-4 h-4 mr-2" />
                                    Cari
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Students Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Siswa
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kelas & Jurusan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nilai
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {students.data.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {student.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        NISN: {student.nisn}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{student.class}</div>
                                                <div className="text-sm text-gray-500">{student.major}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`text-sm font-medium ${
                                                    student.score >= 90 ? 'text-green-600' :
                                                    student.score >= 80 ? 'text-blue-600' :
                                                    student.score >= 75 ? 'text-yellow-600' :
                                                    'text-red-600'
                                                }`}>
                                                    {student.score}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(student.status)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Link href={`/students/${student.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/students/${student.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(student)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {students.data.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Tidak ada data siswa yang ditemukan.</p>
                                <Link href="/students/create" className="mt-4 inline-block">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Tambah Siswa Pertama
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        {students.last_page > 1 && (
                            <div className="px-6 py-3 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Menampilkan {students.data.length} dari {students.total} data
                                    </div>
                                    <div className="flex space-x-1">
                                        {students.links.map((link, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    if (link.url) {
                                                        router.get(link.url, {}, { preserveState: true });
                                                    }
                                                }}
                                                disabled={!link.url}
                                                className={`px-3 py-2 text-sm rounded-md ${
                                                    link.active
                                                        ? 'bg-indigo-600 text-white'
                                                        : link.url
                                                        ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}