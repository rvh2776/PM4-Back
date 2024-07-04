import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { OrdersDetail } from '../orders-details/entities/orders-detail.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrdersDetail)
    private ordersDetailRepository: Repository<OrdersDetail>,
    private dataSource: DataSource,
  ) {}

  async findByEmail(email: string): Promise<UpdateUserDto | undefined> {
    const userEmail = this.usersRepository.findOneBy({ email });

    return userEmail;
  }

  async findAll() {
    const users = await this.usersRepository.find();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usersOut = users.map(({ password, ...users }) => {
      return users;
    });
    return usersOut;
  }

  async getUserByID(id: string): Promise<UpdateUserDto | string> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!user) {
      throw new NotFoundException(`El usuario con id: ${id} no existe`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, isAdmin, ...userOut } = user;

    return userOut;
  }

  async createUser(user: UpdateUserDto) {
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async updateUser(id: string, userUpdate: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`El usuario con id: ${id} no existe`);
    }

    const updatedUser = { ...user, ...userUpdate, id };

    await this.usersRepository.update(id, updatedUser);
    await this.usersRepository.save(updatedUser);

    return updatedUser.id;
  }

  async deleteUser(id: string) {
    const userDel = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!userDel) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
    }

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      // Si el usuario tiene órdenes asociadas, eliminar primero los detalles de las ordenes
      if (userDel.orders && userDel.orders.length > 0) {
        for (const order of userDel.orders) {
          const orderDetail = await this.ordersDetailRepository.findOne({
            where: { order },
            relations: ['products'],
          });

          if (orderDetail) {
            await transactionalEntityManager.remove(OrdersDetail, orderDetail);
          }
        }
      }
      // Ahora elimino al usuario, lo que también eliminará las órdenes debido a la eliminación en cascada configurada en las entidades
      await transactionalEntityManager.remove(User, userDel);
    });

    return { success: `User with id: ${id} deleted successfully` };
  }
}
