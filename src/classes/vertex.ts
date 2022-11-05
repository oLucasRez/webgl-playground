import { Vector } from './vector';

export class Vertex {
  constructor(readonly attributes: Record<string, Vector>) {}

  serialize(): number[] {
    const serial = Object.values(this.attributes).reduce(
      (acc, attribute) => [...acc, ...attribute.toArray()],
      [] as number[]
    );

    return serial;
  }
}
