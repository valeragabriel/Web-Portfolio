export class InternalServerError extends Error {
  action: string;
  statusCode: number;
  constructor({ cause }) {
    super('Internal Server Error', {
      cause,
    });
    this.name = 'InternalServerError';
    this.action = 'Contact with suport team';
    this.statusCode = 500;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
