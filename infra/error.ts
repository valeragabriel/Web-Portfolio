export class InternalServerError extends Error {
  action: string;
  statusCode: number;
  constructor({ cause, statusCode }) {
    super('Internal Server Error', {
      cause,
    });
    this.name = 'InternalServerError';
    this.action = 'Contact with suport team';
    this.statusCode = statusCode;
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

export class ServiceError extends Error {
  action: string;
  statusCode: number;
  constructor({ cause, message }) {
    super(message || 'Service unvailable', {
      cause,
    });
    this.name = 'ServiceError';
    this.action = 'Check Service available ';
    this.statusCode = 503;
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

export class MethodNotAllowed extends Error {
  action: string;
  statusCode: number;
  constructor() {
    super('Method Not Allowed');
    this.name = 'MethodNotAllowed';
    this.action = 'Try another method, this method not exist in system for this url';
    this.statusCode = 405;
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