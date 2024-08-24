import instance from '../http/index';
import BaseService from './BaseService'

const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService(param).then(response => {
                console.log(response);

                resolve(response)
            }).catch(errors => {
                reject(errors)
            })
        })
    }
}


export const ManagerService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            instance(param).then(response => {
                console.log(response);

                resolve(response)
            }).catch(errors => {
                reject(errors)
            })
        })
    }
}

export default ApiService