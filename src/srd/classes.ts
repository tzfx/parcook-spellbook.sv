import { artificer } from "./class-artificer.tce";
import { cleric } from "./class-cleric.phb";
import { druid } from "./class-druid.phb";
import { paladin } from "./class-paladin.phb";
import { wizard } from "./class-wizard.phb";
export const classes = {
    artificer,
    cleric,
    druid,
    paladin,
    wizard,
};

export const randomClass = () =>
    classes[
        Object.keys(classes)[
            Math.floor(Math.random() * Object.keys(classes).length)
        ]
    ];
