export class E2JResponse {
  constructor(
    readonly error: null | Error | ErrorConstructor | string,
    readonly success: boolean,
    readonly message: string,
    readonly data: any
  ) {}
}
