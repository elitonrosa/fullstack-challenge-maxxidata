import { ApiProperty } from '@nestjs/swagger';

export class NestBadRequestErrorSwagger {
  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty({ isArray: true, type: String })
  readonly message: string[];

  @ApiProperty()
  readonly error: string;
}
