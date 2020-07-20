import { MigrationInterface, QueryRunner, getConnection } from 'typeorm';
import { EncryptHelper } from '@base/helpers';
import { User } from '@api/entities';

export class userSeeding1595271074340 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder(queryRunner)
      .insert()
      .into(User)
      .values([{
        username: 'root',
        password: await User.hashPassword('123456'),
        fullName: 'Root',
        createdAt: new Date(),
        updatedAt: new Date(),
      }])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder(queryRunner)
      .delete()
      .from(User)
      .where('username = :username', { username: 'root' })
      .execute();
  }

}
