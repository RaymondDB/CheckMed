module.exports = {
    isAllowedEmailDomain: (email) => {
        const forbiddenDomains = ["spam.com", "tempmail.com"];
        const domain = email.split("@")[1];
        return !forbiddenDomains.includes(domain);
    },

    isAllowedZipCode: (zipCode) => {
        if (typeof zipCode !== 'string') {
            return false; 
          }

          if (zipCode.length > 10) {
            return false; 
          }
        
        return true; 
    },

    isAllowedWebSiteUrl: (webSiteUrl) => {
        if(typeof webSiteUrl !== 'string' || url.trim().length === 0){
            return false
        }

        if(!webSiteUrl.startsWith("www.")) {
            return false
        }

        const validDomains = [".com", ".net", ".org", ".us", ".do", ".ca", ".jp", ".es"];
        let validDomain = false;
        for (let urlDomain of validDomains ) {
        if(validDomains.endsWith(validDomain)) {
            validDomain = true
            break
        }
        }

        if(!validDomain){
            return false
        }

        if (/[^a-zA-Z0-9.\/:@-_?&=%]+/.test(webSiteUrl)) {
            return false;
          }

        return true;
    }
}