import { ApiProperty } from '@nestjs/swagger';

export class NestErrorDefaultSwagger {
  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly error: string;
}
