import { spells as phb } from "./spells-phb.js";
import { spells as tce } from "./spells-tce.js";
import { spells as xge } from "./spells-xge.js";

export const spells = [...phb, ...tce, ...xge]
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .sort((a, b) => (a.level < b.level ? -1 : +1));
