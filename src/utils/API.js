const apiCall = async ( url, method = "GET", body = {}, headers = {}, params = {} ) => {
  try {
    
    const queryString = new URLSearchParams(params).toString();
    const requestUrl = queryString ? `${url}?${queryString}` : url;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const options = {
      method,
      headers: defaultHeaders,
    };

    if (method !== "GET" && method !== "HEAD") {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(requestUrl, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API call failed");
    }
  
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Network error or server is unreachable");
  }
};

export default apiCall;
