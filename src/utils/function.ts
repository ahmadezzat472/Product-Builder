/**
 * Slices a given string if it exceeds a specified length and appends an ellipsis (`...`).
 *
 * @param {string} txt - The input string to be sliced.
 * @param {number} [max=50] - The maximum allowed length for the string before it gets sliced. Defaults to 50.
 * @returns {string} - The sliced string with an ellipsis if the length exceeds the limit, otherwise the original string.
 */

export function txtSlicer(txt: string, max: number = 50) {
    if(txt.length > max) return `${txt.slice(0, max)} ...`
    else return txt
}