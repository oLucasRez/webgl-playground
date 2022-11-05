export class Vector {
  private values: number[];

  constructor(...values: number[]) {
    this.values = values;
  }

  dimension() {
    return this.values.length;
  }

  toArray() {
    return this.values;
  }
}
