import { Knex } from 'knex';

export class WebpackSeedSource {
  constructor(public seedContext: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.seedContext = seedContext;
  }

  getSeeds(): Promise<Knex.Seed[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return Promise.resolve(this.seedContext.keys().sort());
  }

  getSeed(seed: string): Promise<Knex.Seed> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return this.seedContext(seed);
  }
}
