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

    async AllMenu() {
        const response = await apiClient.post(`/menu`);
        return response.data;
    }
    async MenuAdd(body: any) {
        const response = await apiClient.post(`/menu/add`, body);
        return response.data;
    }
    async MenuDelete(body: any) {
        const response = await apiClient.post(`/menu/delete`, body);
        return response.data;
    }

    async AllGroupMenu(body: any) {
        const response = await apiClient.post(`/menu/group`, body);
        return response.data;
    }
    async GroupMenuAdd(body: any) {
        const response = await apiClient.post(`/menu/group/add`, body);
        return response.data;
    }
    async GroupMenuDelete(body: any) {
        const response = await apiClient.post(`/menu/group/delete`, body);
        return response.data;
    }

    async AllGroupItemMenu(body: any) {
        const response = await apiClient.post(`/menu/group/item`, body);
        return response.data;
    }
    async MenuItemAdd(body: any) {
        const response = await apiClient.post(`/menu/group/item/add`, body);
        return response.data;
    }
    async MenuItemDelete(body: any) {
        const response = await apiClient.post(`/menu/group/item/delete`, body);
        return response.data;
    }

    async ShowMenu(body: any) {
        const response = await apiClient.post(`/menu/show`, body);
        return response.data;
    }
}

const apiService = new ApiService();

export default apiService;
