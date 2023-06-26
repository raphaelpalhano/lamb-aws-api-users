type BadRequestType = 'Bad_Request_Error';

export interface BadRequestProps {
  description?: string;
  error: string;
  typeError: BadRequestType;
}

const DEFAULT_MESSAGES: Record<BadRequestType, string> = {
  Bad_Request_Error: 'Request invalid or malformed.',
};

export class BadRequestError extends Error {
  readonly statusCode: number;
  readonly error: string;
  readonly description: string;
  readonly type: BadRequestType;
  constructor(props: BadRequestProps) {
    super(props.description);
    this.name = 'BadRequestError';
    this.statusCode = 400;
    this.type = props.typeError;
    this.error = props.error;
    this.description = props.description || DEFAULT_MESSAGES[this.type];
  }
}
