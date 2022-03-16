// Collection of functions that are useful but non-specific to any particular files 

function getBetweenStrings(data, start_string, end_string) {
    const regex = new RegExp(`${start_string}(.*?)${end_string}`, "s");
    const match = data.match(regex);
    return match ? match[1] : undefined;
}

module.exports = { getBetweenStrings };