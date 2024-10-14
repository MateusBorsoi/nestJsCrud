import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('Usuário não encontrado!');
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user); // O método save atualiza a entidade
  }
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
