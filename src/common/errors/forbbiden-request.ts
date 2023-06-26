type ForbbidenType = 'Forbidden';

export interface ForbiddenProps {
  description?: string;
  error: string;
  typeError: ForbbidenType;
}

const DEFAULT_MESSAGES: Record<ForbbidenType, string> = {
  Forbidden: 'Usuario ou Token invalido',
};

export class ForbiddenError extends Error {
  readonly statusCode: number;
  readonly error: string;
  readonly description: string;
  readonly type: ForbbidenType;
  constructor(props: ForbiddenProps) {
    super(props.description);
    this.name = 'Forbidden';
    this.statusCode = 403;
    this.type = props.typeError;
    this.error = props.error;
    this.description = props.description || DEFAULT_MESSAGES[this.type];
  }
}
