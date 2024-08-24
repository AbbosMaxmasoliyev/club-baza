import SelectView from 'components/template/CardInfo'
import Founder from 'components/template/Foounders'
import Projects from 'components/template/Projects'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BaseService from 'services/BaseService'
import { openNotification } from 'utils/notification'
import Users from 'views/Users'
import UsersAdmin from 'views/Users/UserAdmin'




const Founders = () => {

    const { club_id } = useParams()
    const [view, setView] = useState('users')
    const [url, setUrl] = useState('')

    const getUrl = async () => {
        try {
            let response = await BaseService.get(`/admin/club/${club_id}`)
            console.log(response);

            setUrl(response.data.club.url)
        } catch (error) {
            openNotification("error", "Malumotlarni olishda xatolik")
        }
    }

    useEffect(() => {
        getUrl()
    }, [])
    return (
        <div className='flex flex-col'>
            <SelectView setView={setView} view={view} />
            {
                view === "users" && <UsersAdmin url={url} />
            }
            {
                view === "managers" && <Founder role={"menejer"} club_id={club_id} view={view} />
            }
            {
                view === "founder" && <Founder role={"founder"} club_id={club_id} view={view} />
            }
            {
                view === "projects" && <Projects club_id={club_id} />
            }
        </div>
    )
}

export default Founders