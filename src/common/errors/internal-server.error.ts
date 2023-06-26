export interface InternalServerErrorProps {
  statusCode: number;
  error: string;
  typeError: string;
}

const DEFAULT_MESSAGES: Record<string, string> = {
  INTERNAL_SERVER_ERROR: 'A require param was missing, or malformed.',
};

export class InternalServerError extends Error {
  readonly statusCode: number;
  readonly error: string;
  readonly typeError: string;
  constructor(props: InternalServerErrorProps) {
    super(props.error);
    this.name = 'InternalServerError';
    this.statusCode = props.statusCode;
    this.typeError = props.typeError;
    this.error = props.error || DEFAULT_MESSAGES[this.typeError];
  }
}
