import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeDeleteRealtions1717800618095 implements MigrationInterface {
    name = 'AddCascadeDeleteRealtions1717800618095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1"`);
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_70b7766304d1661201d0ae7fe93"`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_70b7766304d1661201d0ae7fe93" FOREIGN KEY ("order_detail_id") REFERENCES "orderDetails"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_70b7766304d1661201d0ae7fe93"`);
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1"`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_70b7766304d1661201d0ae7fe93" FOREIGN KEY ("order_detail_id") REFERENCES "orderDetails"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
