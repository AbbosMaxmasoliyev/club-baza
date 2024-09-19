import BaseService from "./BaseService"

export const createManager = async (data, club_id) => {
    try {
        let createManager = await BaseService.post(`/admin/menejer?club_id=${club_id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(createManager);

    } catch (error) {
        console.log(error);

    }
}




export const getClubs = async (query) => {
    try {
        let response = await BaseService.get(`/admin/club${query ? "?" + query : ""}`,)
        console.log(response);

        return response

    } catch (error) {
        console.log(error);
        return error


    }
}






export const apiGetClubs = async () => {
    try {
        let response = await BaseService.get(`/admin/club`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const deleteManager = async (id) => {
    try {
        let response = await BaseService.delete(`/menejer/v1//${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const updateManager = async (id, club_id, data) => {
    try {
        let response = await BaseService.put(`/admin/menejer/${id}?club_id=${club_id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}





export const updateClub = async (club_id, data) => {
    try {
        let response = await BaseService.put(`/admin/club/${club_id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}


export const createClub = async (data) => {
    try {
        let response = await BaseService.post(`/admin/club`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const deleteClub = async (club_id) => {
    try {
        let response = await BaseService.delete(`/admin/club/${club_id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}





export const apiGetProducts = async (id) => {
    try {
        let response = await BaseService.get(`/admin/project?club_id=${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}


export const updateSubscribeAdmin = async (id, club_id, data) => {
    try {
        let response = await BaseService.put(`/admin/subscription/${id}?club_id=${club_id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const getDashboardFounder = async () => {
    try {
        let clientResponse = await BaseService.get(`admin/dashboard`)
        console.log(clientResponse);

        return clientResponse.data.data

    } catch (error) {
        console.log(error);
        return error


    }
}
