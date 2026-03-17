export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);

    this.statusCode = statusCode;
  }
}

export class InvalidDataError extends AppError {
  public message: string;

  constructor(message: string = "Invalid Data Provided!") {
    super(message);

    this.name = "InvalidDataError";
    this.statusCode = 400;
    this.message = message;
  }
}

export class NotFoundError extends AppError {
  public message: string;

  constructor(message: string = "Data Not found!") {
    super(message);

    this.name = "NotFoundError";
    this.statusCode = 404;
    this.message = message;
  }
}
