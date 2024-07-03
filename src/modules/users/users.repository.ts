import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/UserDto';
// import { UpdateUserDto } from './dtos/UpdateUserDto';

@Injectable()
export class UsersRepository {
  private users: UserDto[] = [
    {
      id: '1',
      email: 'usuario1@example.com',
      name: 'Usuario Uno',
      password: 'contraseña1',
      rePassword: 'contraseña1',
      address: '123 Calle Principal',
      phone: 1234567890,
      country: 'País 1',
      city: 'Ciudad 1',
      createdAt: '16/05/2024',
      isAdmin: false,
    },
    {
      id: '2',
      email: 'usuario2@example.com',
      name: 'Usuario Dos',
      password: 'contraseña2',
      rePassword: 'contraseña2',
      address: '456 Calle Secundaria',
      phone: 9876543210,
      country: 'País 2',
      city: 'Ciudad 2',
      createdAt: '16/05/2024',
      isAdmin: false,
    },
    {
      id: '3',
      email: 'usuario3@example.com',
      name: 'Usuario Tres',
      password: 'contraseña3',
      rePassword: 'contraseña3',
      address: '789 Calle Terciaria',
      phone: 1112223333,
      country: undefined,
      city: 'ciudad 3',
      createdAt: '16/05/2024',
      isAdmin: false,
    },
  ];

  // async findByEmail(email: string): Promise<UserDto | undefined> {
  //   return this.users.find((user) => user.email === email);
  // }

  // async findAll() {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   return this.users.map(({ password, ...user }) => {
  //     return user;
  //   });
  // }

  // async getById(id: number) {
  //   const user = this.users.find((user) => user.id === id);

  //   if (!user) {
  //     return 'El usuario no existe';
  //   }
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { password, ...usersOut } = user;

  //   return usersOut;
  // }

  // async createUser(user: Omit<USerDto, 'id'>) {
  //   const id = this.users.length + 1;
  //   this.users = [...this.users, { id, ...user }];

  //   return id;
  // }

  // async updateUser(id: number, userUpdate: UpdateUserDto) {
  //   const userIndex = this.users.findIndex((user) => user.id === id);

  //   if (userIndex === -1) {
  //     return 'El usuario no existe';
  //   }

  //   const user = this.users[userIndex];
  //   const updatedUser = { ...user, ...userUpdate, id };
  //   this.users[userIndex] = updatedUser;

  //   return updatedUser.id;
  // }

  // async deleteUser(id: number) {
  //   const userIndex = this.users.findIndex((user) => user.id === id);

  //   if (userIndex === -1) {
  //     return 'El usuario no existe';
  //   }

  //   const userDelete = this.users[userIndex];
  //   this.users.splice(userIndex, 1);

  //   return userDelete.id;
  // }
}
