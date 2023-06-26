type unauthorizedRequestType = 'Unathorized';

export interface UnauthorizedProps {
  description?: string;
  error: string;
  typeError: unauthorizedRequestType;
}

const DEFAULT_MESSAGES: Record<unauthorizedRequestType, string> = {
  Unathorized: 'Credenciais invalidas.',
};

export class UnauthorizedError extends Error {
  readonly statusCode: number;
  readonly error: string;
  readonly description: string;
  readonly type: unauthorizedRequestType;
  constructor(props: UnauthorizedProps) {
    super(props.description);
    this.name = 'Unauthorized';
    this.statusCode = 401;
    this.type = props.typeError;
    this.error = props.error;
    this.description = props.description || DEFAULT_MESSAGES[this.type];
  }
}
