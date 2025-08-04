exports.handler = async (request) => {
    const ipinfoToken = process.env.IPINFO_TOKEN; 
    const response = await fetch(`https://ipinfo.io/json?token=${ipinfoToken}`);
    const data = await response.json();
    return {statusCode: response.status, body: data.country};
};