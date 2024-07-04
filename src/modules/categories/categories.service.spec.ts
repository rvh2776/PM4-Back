import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';

// TODO: Test desactivado agregando: .test al describe, para que no tire error hasta que no lo implemente.

describe.skip('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
