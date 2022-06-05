import * as localforage from "localforage";

import type { prep } from "../prep";

export class CharacterStorage {
    get(id?: string): Promise<prep> {
        return localforage.getItem<prep>(id ?? "last");
    }

    set(prep: prep): Promise<prep> {
        prep.id = prep.id ?? Date.now().toString();
        localforage.setItem("last", prep.id);
        return localforage.setItem(prep.id, prep);
    }

    export(character: prep) {
        throw Error("Export not yet implemented.");
    }

    import() {
        throw Error("Import not yet implemented.");
    }
}
