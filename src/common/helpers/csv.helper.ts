export const convertToCSV = (arr: string[][], delimiter = ",") =>
    arr
        .map((it) => {
            return Object.values(it)
                .map((val) =>
                    typeof val === "object" ? encodeURIComponent(JSON.stringify(val)) : encodeURIComponent(val)
                )
                .join(delimiter);
        })
        .join("\r\n");

export const convertFromCSV = (csv: string, lineDelimeter = "\n"): Array<any> => {
    const lines = csv.split(lineDelimeter);
    const result: Record<string, string>[] = [];
    const headers = lines.shift()?.split(",");

    if (!headers) {
        return [];
    }

    lines.forEach((line) => {
        const obj: Record<string, string> = {};
        const lineValuesArray = line.split(",");

        headers.map((header, i) => {
            let value;
            try {
                value = JSON.parse(decodeURIComponent(lineValuesArray[i]));
            } catch (e) {
                value = tryDecodeURIComponent(lineValuesArray[i]);
            } finally {
                obj[header] = value;
            }
        });

        result.push(obj);
    });

    return result;
};

const tryDecodeURIComponent = (value: string): string => {
    try {
        return decodeURIComponent(value);
    } catch (error) {
        return JSON.parse(value);
    }
};
