import type { Knex } from 'knex';

export class WebpackMigrationSource {
  constructor(public migrationContext: any) {
    this.migrationContext = migrationContext;
  }

  getMigrations(): Promise<Knex.Migration[]> {
    return Promise.resolve(this.migrationContext.keys().sort());
  }

  getMigrationName = (migration: string): string => {
    return migration;
  };

  getMigration(migration: string): Promise<Knex.Migration> {
    return this.migrationContext(migration);
  }
}
