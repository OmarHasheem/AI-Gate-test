import axios from "axios";

export const httpCall = async ({requestConfig, applyData = null}) => {
    const response = await axios({
        method: requestConfig.method ? requestConfig.method : 'GET',
        url: requestConfig.url,
        headers: requestConfig.headers ? requestConfig.headers : {},
        data: applyData ? applyData : null,
    });

  return response;
};
