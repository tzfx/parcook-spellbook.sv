import * as localforage from "localforage";

import type { prep } from "../prep";

export class CharacterStorage {
    private idlist: string[] = [];

    async get(name?: string): Promise<prep> {
        if (name == null) {
            const lastsaved = await localforage.getItem<string>("last");
            return await localforage.getItem<prep>(lastsaved);
        } else {
            return localforage.getItem<prep>(name);
        }
    }

    async list(refresh = false): Promise<string[]> {
        if (this.idlist.length === 0 || refresh) {
            const list = (await localforage.getItem<string[]>("idlist")) ?? [];
            this.idlist = list;
            return list;
        }
        return this.idlist;
    }

    set(prep: prep): Promise<prep> {
        const { name } = prep;
        if (!this.idlist.includes(name)) {
            this.idlist.push(name);
            localforage.setItem("idlist", this.idlist);
        }
        localforage.setItem("last", prep.name);
        return localforage.setItem(name, prep);
    }

    setSRD(srd: boolean): Promise<boolean> {
        return localforage.setItem("srd", srd);
    }

    getSRD(): Promise<boolean> {
        return localforage.getItem("srd").then((v: boolean) => v ?? true);
    }

    async delete(id: string) {
        await localforage.removeItem(id);
        this.idlist = this.idlist.filter((i) => i !== id);
        return localforage.setItem("idlist", this.idlist);
    }

    export(character: prep) {
        throw Error("Export not yet implemented.");
    }

    import() {
        throw Error("Import not yet implemented.");
    }
}
