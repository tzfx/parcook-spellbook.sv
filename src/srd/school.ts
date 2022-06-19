export const alpha2school = (alpha: string) => {
    switch (alpha) {
        case "A":
            return "abjuration";
        case "C":
            return "conjuration";
        case "D":
            return "diviniation";
        case "E":
            return "enchantment";
        case "V":
            return "evocation";
        case "I":
            return "illusion";
        case "N":
            return "necromancy";
        case "T":
            return "transmutation";
        default:
            throw new Error("Unsupported alpha/school." + alpha);
    }
};
