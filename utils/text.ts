const textMappings: { [key: string]: string } = {
    f: "Femenino",
    m: "Masculino",
    vibration: "Vibración",
    bdsm: "BDSM",
    lingerie: "Lencería",
    silicone: "Silicona",
};

const text = (key: string) => textMappings[key] || key;

export default text;