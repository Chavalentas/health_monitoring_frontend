import { Entry } from "../models/entry.model";

export class PostgresJsonParsingService {
  public parseToPostgresqlJson(entry: Entry): any {
      let json = JSON.parse(JSON.stringify(entry));
      return json;
  }

  public parseFromPostgresqlJson(json: any): Entry {
      let entry = {
        id: json["id"],
        userId: json["userid"],
        sys: json["sys"],
        dia: json["dia"],
        height: json["height"],
        weight: json["weight"],
        dateTime: json["datetime"]
      } as Entry;
      return entry;
  }
}
