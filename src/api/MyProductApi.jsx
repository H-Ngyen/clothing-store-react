const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function createMyProductApi(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/my/product`, {
            method: "POST",
            body: formData
        });        

        if (!response.ok) throw new Error("Failed to create product!");
        return response.json();
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export async function updateMyProductApi(formData, productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/my/product/${productId}`, {
            method: "PUT",
            body: formData
        });

        if (!response.ok) throw new Error("Failed to update product!");
        return response.json();
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export async function deleteMyProductApi(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/my/product/${productId}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete product!");
        return response.json();

    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};