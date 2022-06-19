export interface SRDSpell {
    name: string;
    source: string;
    page: number;
    srd: boolean;
    level: number;
    school: string;
    time: Time[];
    range: {
        type: string;
        distance: {
            type: string;
            amount: number;
        };
    };
    components: {
        v?: boolean;
        s?: boolean;
        m?: any;
    };
    duration: {
        type: string;
        duration: {
            type: string;
            amount: number;
        };
        concentration?: boolean;
    }[];
    entries: Array<string | Entry>;
    entriesHigherLevel?: Entry[];
    miscTags?: string[];
    areaTags?: string[];
    classes: {
        fromClassList: Array<{ name: string; source: string }>;
        races?: Array<{
            name: string;
            source: string;
            baseName: string;
            baseSource: string;
        }>;
        backgrounds?: Array<{ name: string; source: string }>;
    };
}

export interface Entry {
    type: string;
    name: string;
    entries: Entry[];
}

export interface Time {
    number: number;
    unit: string;
}
