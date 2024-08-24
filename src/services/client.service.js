import BaseService from "./BaseService"

export const createCleint = async (data) => {
    try {
        let createClientResponse = await BaseService.post("/client/v1", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(createClientResponse);

    } catch (error) {
        console.log(error);

    }
}




export const getUsers = async (query) => {
    try {
        let clientResponse = await BaseService.get(`/admin/subscription${query ? query : ""}`,)
        return clientResponse

    } catch (error) {
        console.log(error);
        return error


    }
}



export const getManagers = async (query) => {
    try {
        let clientResponse = await BaseService.get(`/admin/menejer${query ? query : ""}`,)
        return clientResponse

    } catch (error) {
        console.log(error);
        return error


    }
}


export const getUsersDebtors = async (query) => {
    try {
        let clientResponse = await BaseService.get(`${query ? query : ""}`,)
        return clientResponse

    } catch (error) {
        console.log(error);
        return error


    }
}






export const clientGetById = async (id) => {
    try {
        let response = await BaseService.get(`/client/v1/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const deleteUser = async (id, club_id) => {
    try {
        let response = await BaseService.delete(`/admin/menejer/${id}?club_id=${club_id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}






export const updateSubscribe = async (id, data) => {
    try {
        let response = await BaseService.put(`/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}


export const createProject = async (id, data) => {
    try {
        let response = await BaseService.post(`/admin/project?club_id=${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}





export const updateProject = async (id, project, data) => {
    try {
        let response = await BaseService.put(`/admin/project/${project}?club_id=${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}




export const deleteProject = async (id, project,) => {
    try {
        let response = await BaseService.delete(`/admin/project/${project}?club_id=${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}

