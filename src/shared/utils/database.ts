type MongoConnectionConfig = {
  host: string,
  port: number,
  databaseName: string,
  username: string,
  password: string,
}

export function buildMongoURI(config: MongoConnectionConfig): string {
  const { username, password, host, port, databaseName } = config;
  return `mongodb://${username}:${password}@${host}:${String(port)}/${databaseName}?authSource=admin`;
}
