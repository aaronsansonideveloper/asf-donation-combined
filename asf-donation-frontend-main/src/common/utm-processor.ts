export const utmProcessor = {
  getUTM: () => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmTerm = urlParams.get('utm_term');
    const utmContent = urlParams.get('utm_content');
    const fbclid = urlParams.get('fbclid');

    if (utmSource || fbclid) {
      return {
        source: utmSource?.toString() || "",
        medium: utmMedium?.toString() || "",
        campaingn: utmCampaign?.toString() || "",
        term: utmTerm?.toString() || "",
        advertisement: utmContent?.toString() || "",
        fbclid: fbclid?.toString(),
      };
    }
  },

  setUTMToSession: (utm: any) => {
    sessionStorage.setItem('utm', JSON.stringify(utm));
  },

  getUTMFromSession: () => {
    const utm = sessionStorage.getItem('utm');
    if (typeof utm === 'string') {
      try {
        return JSON.parse(utm);
      } catch (error) {
        //   console.log('error', error);
      }
    } else {
      return null;
    }
  },
};
