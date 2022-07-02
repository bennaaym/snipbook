import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((_, context: ExecutionContext) => {
  const { user } = context.switchToHttp().getRequest();
  return { id: user?.id };
});
