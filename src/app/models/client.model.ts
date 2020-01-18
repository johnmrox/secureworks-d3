export class Client { // TODO: can this be an interface instead?
  // TODO: should i make a model for friends?
  // TODO: is this public thing best practice?
  // TODO: are any of these optional?
  constructor(public name: string, public age: number, public weight: number, public friends: string[]) {
  }
}
