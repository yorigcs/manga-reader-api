export class UserEmailError extends Error {
  constructor() {
    super('This e-mail is already associated with an account.');
    this.name = 'UserEmail';
  }
}