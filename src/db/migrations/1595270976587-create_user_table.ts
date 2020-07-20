import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1595270976587 implements MigrationInterface {
  name = 'createUserTable1595270976587'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `user` (`created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(36) NOT NULL, `username` varchar(60) NOT NULL, `password` varchar(60) NOT NULL, `full_name` varchar(180) NOT NULL, `phone` varchar(15) NULL, UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`');
    await queryRunner.query('DROP TABLE `user`');
  }

}
