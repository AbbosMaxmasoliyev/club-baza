import instance from "../http/index";

export const deleteUser = async (id, club_id) => {
    try {
        let response = await instance.delete(`/admin/menejer/${id}?club_id=${club_id}`, {
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
        let response = await instance.put(`/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}



export const getUsersDebtors = async (query) => {
    try {
        let clientResponse = await instance.get(`${query ? query : ""}`,)
        return clientResponse

    } catch (error) {
        console.log(error);
        return error


    }
}



export const clientGetById = async (id) => {
    try {
        let response = await instance.get(`/client/v1/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response

    } catch (error) {
        console.log(error);

    }
}

