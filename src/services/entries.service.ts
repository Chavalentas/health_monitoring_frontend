import axios from "axios";
import { Entry } from "../models/entry.model";
import bckConfig from '../config/backend.config.json';
import { ErrorMessage } from "../models/error-message.model";
import { SuccessMessage } from "../models/success-message.model";
import { EntryId } from "../models/entry-id.model";
import { PostgresJsonParsingService } from "./postgres-json-parser.service";

export class EntriesService{
    public getEntries(userId: string): Promise<Array<Entry>>{
        const parsingService: PostgresJsonParsingService = new PostgresJsonParsingService();
        return new Promise<Array<Entry>>((resolve, reject) => {
            axios.post<Array<Entry>>(`${bckConfig.server}/entries/entriesbyuser`, {userId: userId})
            .then((response) => {
                let parsedEntries = response.data.map((entry) => parsingService.parseFromPostgresqlJson(entry));
                resolve(parsedEntries);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public postEntry(entry: Entry): Promise<EntryId>{
        return new Promise<EntryId>((resolve, reject) => {
            axios.post<EntryId>(`${bckConfig.server}/entries/addentry`, entry)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public putEntry(entry: Entry): Promise<SuccessMessage>{
        return new Promise<SuccessMessage>((resolve, reject) => {
            axios.put<SuccessMessage>(`${bckConfig.server}/entries/${entry.id}`, entry)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public deleteEntry(entryId: string): Promise<SuccessMessage>{
        return new Promise<SuccessMessage>((resolve, reject) => {
            axios.delete<SuccessMessage>(`${bckConfig.server}/entries/${entryId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }

    public deleteEntries(userId: string): Promise<SuccessMessage>{
        return new Promise<SuccessMessage>((resolve, reject) => {
            axios.delete<SuccessMessage>(`${bckConfig.server}/entries/all/${userId}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data as ErrorMessage);
            })
        })
    }
}