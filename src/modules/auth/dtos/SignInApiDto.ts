import { ApiProperty } from '@nestjs/swagger';

export class SignInApiDto {
  @ApiProperty({ example: 'User logged in successfully' })
  success: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDFhOTlmNy00Y2M5LTQ1YzEtOTVlNy0zM2YwOTQ4OTZmZDEiLCJpZCI6IjMwMWE5OWY3LTRjYzktNDVjMS05NWU3LTMzZjA5NDg5NmZkMSIsImVtYWlsIjoiZXhhbXBsZUB0ZXN0LmNvbSIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTcxODg0NDQ1MSwiZXhwIjoxNzE4ODQ4MDUxfQ.NJjaQs3MFLLGer_ZyKCB8cOQ38LPBalLTT5TVlfl6Js',
  })
  token: string;

  @ApiProperty({ example: '6/19/2024, 9:47:31 PM' })
  issuedAt: string;

  @ApiProperty({ example: '6/19/2024, 10:47:31 PM' })
  expiresAt: string;
}
