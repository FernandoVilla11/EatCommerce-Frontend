export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// Para llamadas server-side (Next.js API routes)
export const API_BASE_URL_SERVER = process.env.API_BASE_URL_SERVER || "http://127.0.0.1:8080";

export const ENDPOINTS = {
    products: `${API_BASE_URL}/products`,
    sales: `${API_BASE_URL}/sales`,
    reports: `${API_BASE_URL}/reports`,
    expenses: `${API_BASE_URL}/expenses`,
    auth: `${API_BASE_URL}/auth`,
    users: `${API_BASE_URL}/users`,
    suppliers: `${API_BASE_URL}/suppliers`,
    purchases: `${API_BASE_URL}/purchases`,
} as const;

export const SERVER_ENDPOINTS = {
    products: `${API_BASE_URL_SERVER}/products`,
    sales: `${API_BASE_URL_SERVER}/sales`,
    reports: `${API_BASE_URL_SERVER}/reports`,
    expenses: `${API_BASE_URL_SERVER}/expenses`,
    auth: `${API_BASE_URL_SERVER}/auth`,
    users: `${API_BASE_URL_SERVER}/users`,
    suppliers: `${API_BASE_URL_SERVER}/suppliers`,
    purchases: `${API_BASE_URL_SERVER}/purchases`,
} as const;