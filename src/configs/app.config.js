import { useSelector } from "react-redux"




const AppConfig = () => {
    return {
        // apiPrefix: 'https://launchpro.uz/palma/api/',
        apiPrefix: localStorage.getItem("prefix") || "*",
        authenticatedEntryPath: '/home',
        unAuthenticatedEntryPath: '/sign-in',
        tourPath: '/home',
        enableMock: false
    }
}

export default AppConfig