import { Knex } from 'knex';

export class WebpackSeedSource {
  constructor(public seedContext: any) {
    this.seedContext = seedContext;
  }

  getSeeds(): Promise<Knex.Seed[]> {
    return Promise.resolve(this.seedContext.keys().sort());
  }

  getSeed(seed: string): Promise<Knex.Seed> {
    return this.seedContext(seed);
  }
}
