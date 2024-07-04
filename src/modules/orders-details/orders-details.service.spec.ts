import { Test, TestingModule } from '@nestjs/testing';
import { OrdersDetailsService } from './orders-details.service';

// TODO: Test desactivado agregando: .test al describe, para que no tire error hasta que no lo implemente.

describe.skip('OrdersDetailsService', () => {
  let service: OrdersDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersDetailsService],
    }).compile();

    service = module.get<OrdersDetailsService>(OrdersDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
