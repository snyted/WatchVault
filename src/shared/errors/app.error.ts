export class AppError extends Error {
  public readonly timestamp = new Date().toLocaleString('pt-BR');

  public constructor(public readonly status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
  };
};