import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/auth/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

// export const Roles = (...roles: Role[]) => {
//   return SetMetadata('roles', roles);
// };
