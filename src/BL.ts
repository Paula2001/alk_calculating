export const calculateBac = (isMale: boolean, gramsInBlood: number, weightInKM: number) => {
    const rate = isMale ? 0.68 : 0.55;
    const weightInGrams = weightInKM*1000;
    return (gramsInBlood / ((weightInGrams) * rate)) * 100
}

export const gramsInBlood = (literOfDrink: number, perOfALK: number ) => {
    const convertToML = 1000;
    return (literOfDrink * convertToML) * (perOfALK / 100) * 0.789;
}

export const getResult = (bacLevel: number) => {
    switch (true) {
        case bacLevel < 0.03:
            return [`Average individual appears normal, BAC=${bacLevel}`,"1.png"];
        case bacLevel < 0.06:
            return [`Mild euphoria, relaxation, joyousness, talkativeness, decreased inhibition, BAC=${bacLevel}`,"2.png"];
        case bacLevel < 0.1:
            return [`Blunted feelings, reduced sensitivity to pain, euphoria, dis-inhibition, extroversion, BAC=${bacLevel}`,"3.png"];
        case bacLevel < 0.2:
            return [`Over-expression, boisterousness, possibility of nausea and vomiting, BAC=${bacLevel}`,"4.png"];
        case bacLevel < 0.3:
            return [`Nausea, vomiting, emotional swings, anger or sadness, partial loss of understanding, impaired sensations, decreased libido, possibility of stupor, BAC=${bacLevel}`,"5.png"];
        case bacLevel < 0.4:
            return [`Stupor, central nervous system depression, loss of understanding, lapses in and out of consciousness, low possibility of death, BAC=${bacLevel}`,"6.png"];
        case bacLevel < 0.5:
            return [`Severe central nervous system depression, coma, possibility of death, BAC=${bacLevel}`,"7.png"];
        default:
            return [`High possibility of death, BAC=${bacLevel}`,"8.png"];
    }
}