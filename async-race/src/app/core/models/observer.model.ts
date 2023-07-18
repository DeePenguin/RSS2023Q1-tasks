export interface Observer<ParamsType> {
  update(params: ParamsType): void
}
