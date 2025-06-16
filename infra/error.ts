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

export class ValidationError extends Error {
  action: string;
  statusCode: number;
  constructor({ cause, message, action }) {
    super(message || 'Um erro de validação ocorreu.', {
      cause,
    });
    this.name = 'ValidationError';
    this.action = action || 'Ajuste os dados enviados e tente novamente.';
    this.statusCode = 400;
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

export class NotFoundError extends Error {
  action: string;
  statusCode: number;
  constructor({ cause, message, action }) {
    super(message || 'Não foi possível encontrar este recurso no sistema.', {
      cause,
    });
    this.name = 'NotFoundError';
    this.action = action || 'Verifique se os parâmetros enviados na consulta estão certos.';
    this.statusCode = 404;
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
export class UnauthorizedError extends Error {
  action: string;
  statusCode: number;
  constructor({ cause, message, action }) {
    super(message || 'Usuário não autenticado.', {
      cause,
    });
    this.name = 'UnauthorizedError';
    this.action = action || 'Faça novamente o login para continuar.';
    this.statusCode = 401;
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

export class MethodNotAllowedError extends Error {
  action: string;
  statusCode: number;
  constructor() {
    super('Método não permitido para este endpoint.');
    this.name = 'MethodNotAllowedError';
    this.action = 'Verifique se o método HTTP enviado é válido para este endpoint.';
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