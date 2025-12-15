/**
 * Dokumentasi: Halaman Daftar Pasien
 * Fungsi: Menampilkan tabel daftar pasien dengan aksi melihat, edit, dan hapus.
 * Ketergantungan: Layout aplikasi, ikon, komponen UI (Button, Input, Card, DropdownMenu).
 * Fitur:
 * - Pencarian pasien (Client-side filtering visual).
 * - Tabel responsif dengan avatar inisial.
 * - Tombol aksi dalam Dropdown Menu.
 * - Indikator Device ID.
 */
import AppLayout from '@/layouts/app-layout';
import { useEffect, useState } from 'react';
import { Eye, Edit, Trash, Plus, Search, MoreHorizontal } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Patient {
    id: number;
    name: string;
    email: string;
    device_primary_id?: string | null;
    updated_at: string;
}

export default function PatientsIndex({ patients }: { patients: { data: Patient[] } }) {
    useEffect(() => {
        document.title = 'Patients Management';
    }, []);

    const [filteredPatients, setFilteredPatients] = useState(patients.data);
    const [searchQuery, setSearchQuery] = useState('');

    // Basic client-side filtering (Visual demo)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredPatients(patients.data.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.email.toLowerCase().includes(query)
        ));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Patients', href: '/patients' }]}>
            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
                        <p className="text-muted-foreground">Manage your patients and their devices.</p>
                    </div>
                    <Button asChild className="shadow-lg">
                        <Link href="/patients/create">
                            <Plus className="mr-2 h-4 w-4" /> Add Patient
                        </Link>
                    </Button>
                </div>

                <Card className="shadow-md">
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Patient List</CardTitle>
                                <CardDescription>A list of all registered patients in your clinic.</CardDescription>
                            </div>
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search patients..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted bg-muted/50">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[300px]">Name</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Device ID</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Active</th>
                                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {filteredPatients.length > 0 ? (
                                            filteredPatients.map((patient) => (
                                                <tr key={patient.id} className="border-b transition-colors hover:bg-muted/50">
                                                    <td className="p-4 align-middle font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-9 w-9">
                                                                <AvatarFallback>{patient.name.charAt(0).toUpperCase()}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex flex-col">
                                                                <span className="font-semibold">{patient.name}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle">{patient.email}</td>
                                                    <td className="p-4 align-middle">
                                                        {patient.device_primary_id ? (
                                                            <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                                                {patient.device_primary_id}
                                                            </div>
                                                        ) : (
                                                            <span className="text-muted-foreground text-xs italic">No Device</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 align-middle text-muted-foreground">
                                                        {new Date(patient.updated_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="p-4 align-middle text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem className="cursor-pointer text-blue-600">
                                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <Edit className="mr-2 h-4 w-4" /> Edit Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="cursor-pointer text-red-600">
                                                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="h-24 text-center text-muted-foreground">
                                                    No patients found matching your search.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
