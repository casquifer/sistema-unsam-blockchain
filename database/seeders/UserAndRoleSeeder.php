<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserAndRoleSeeder extends Seeder
{
    public function run(): void
    {
        // Crear roles
        $roles = ['estudiante', 'universidad', 'pime'];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        // Crear usuarios y asignarles roles
        $usuarios = [
            [
                'name' => 'Estudiante Test',
                'email' => 'estudiante@test.com',
                'password' => Hash::make('password'),
                'role' => 'estudiante',
            ],
            [
                'name' => 'Universidad Test',
                'email' => 'universidad@test.com',
                'password' => Hash::make('password'),
                'role' => 'universidad',
            ],
            [
                'name' => 'PIME Test',
                'email' => 'pime@test.com',
                'password' => Hash::make('password'),
                'role' => 'pime',
            ],
        ];

        foreach ($usuarios as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => $userData['password'],
                ]
            );

            $user->assignRole($userData['role']);
            $user->role = $userData['role'];
            $user->save();
        }
    }
}

