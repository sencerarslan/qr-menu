import { apiClient } from '..';
class ApiService {
    async Login(body: any) {
        const response = await apiClient.post(`/login`, body);
        return response.data;
    }
    async Register(body: any) {
        const response = await apiClient.post(`/register`, body);
        return response.data;
    }
    async AllGetMenu() {
        const response = await apiClient.get(`/all-menu`);
        return response.data;
    }
    async GetMenu(body: any) {
        const response = await apiClient.post(`/menu`, body);
        return response.data;
    }
    async ShowMenu(body: any) {
        const response = await apiClient.post(`/menu/show`, body);
        return response.data;
    }
    async MenuAdd(body: any) {
        const response = await apiClient.post(`/menu/add`, body);
        return response.data;
    }
    async MenuItemAdd(body: any) {
        const response = await apiClient.post(`/menu/item/add`, body);
        return response.data;
    }
    async MenuItemDelete(body: any) {
        const response = await apiClient.post(`/menu/item/delete`, body);
        return response.data;
    }
}

const apiService = new ApiService();

export default apiService;
