const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

export async function getProductApi() {
    try {
        console.log("getProductApi function called");
        console.log(`API_BASE_URL: ${API_BASE_URL}`);
        
        
        const response = await fetch(`${API_BASE_URL}/api/product`);
        if (!response.ok) {
            throw new Error("failed to get product!");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};

export async function getProductByIdApi(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/product/by/${id}`);
        if (!response.ok) {
            throw new Error("failed to get product!");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};