import type { Knex } from 'knex';

export class WebpackMigrationSource {
  constructor(public migrationContext: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.migrationContext = migrationContext;
  }

  getMigrations(): Promise<Knex.Migration[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
    return Promise.resolve(this.migrationContext.keys().sort());
  }

  getMigrationName = (migration: string): string => {
    return migration;
  };

  getMigration(migration: string): Promise<Knex.Migration> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
    return this.migrationContext(migration);
  }
}
