import { UserDto } from '../../../modules/users/dtos/user.dto';

export interface SQSPayloadDto {
  eventType: string;
  user: UserDto;
}
