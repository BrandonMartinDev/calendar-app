// -- == [[ METHODS ]] == -- \\

const getDomainFromOrigin = (origin: string) => {

    const split = origin.split("//");
    const domainAndPort = split[1];
    const domain = domainAndPort.split(":")[0];

    return domain;

}

const isOriginLocal = (origin: string): boolean => {

    console.log(origin);

    return origin.includes("localhost")
        || origin.includes("192.168")
        || origin.includes("172.16");

}



// -- == [[ EXPORTS ]] == -- \\

export {
    getDomainFromOrigin,
    isOriginLocal
}