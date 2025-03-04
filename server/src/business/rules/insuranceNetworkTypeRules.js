module.exports = {
    isAllowedEmailDomain: (email) => {
        const forbiddenDomains = ["spam.com", "tempmail.com"];
        const domain = email.split("@")[1];
        return !forbiddenDomains.includes(domain);
    },
}