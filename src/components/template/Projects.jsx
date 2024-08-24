import UserItem from 'components/template/UserItem'
import React, { useEffect, useState } from 'react'
import { HiUserCircle } from 'react-icons/hi'
import { useParams } from 'react-router-dom'

import { Button, Dialog, Input, Pagination, Select } from 'components/ui'
import Table from 'components/ui/Table'
import { BsBasket2Fill, BsPen, BsPenFill } from 'react-icons/bs'
import { CgEditBlackPoint, CgEditExposure, CgEditFlipV, CgEditHighlight, CgEditStraight } from 'react-icons/cg'
import { formattedPhoneNumber } from 'utils/formatted'
import getUpdateInformation from '../../components/template/UpdateForm'
import { clientGetById, createCleint, deleteProject, deleteUser, getUsers } from 'services/client.service'
import { openNotification } from 'utils/notification'
import UpdateUser from '../../components/template/UpdateForm'
import CreateUser from '../../components/template/CreateUser'
import moment from 'moment/moment'
import { permission } from 'configs/navigation.config'
import { apiGetClubs, apiGetProducts } from 'services/clubs.service'
import ProjectForm from './ProjectForm'

const { Tr, Th, Td, THead, TBody } = Table




const pageSizeOption = [
    { value: 100, label: '100 / page' },
    { value: 200, label: '200 / page' },
    { value: 300, label: '300 / page' },
]


const Projects = ({ club_id }) => {
    const [data, setData] = useState(null)





    const [totalIndex, setTotal] = useState(10)
    const [role, setRole] = useState("")
    const [selectValue, setSelectValue] = useState(300)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")



    const [updateData, setUpdateData] = useState(null)
    const [updateId, setUpdateId] = useState(null)
    const [updateShow, setUpdateShow] = useState(false)
    const [deleteData, setDeleteData] = useState({})

    const getClients = async () => {
        try {
            let response = await apiGetProducts(club_id)
            console.log(response);

            setData(response.data.projects)
        } catch (error) {

        }
    }




    useEffect(() => {
        getClients()
    }, [selectValue, page, search])

    // const getUpdateInformation = async (idData) => {
    //     try {
    //         let updateResponse = await clientGetById(idData)
    //         console.log(updateResponse);
    //         if (updateResponse.data.relatedClients) {

    //             setUpdateData(updateResponse.data.relatedClients)
    //         } else {
    //             setUpdateData(updateResponse.data.client)
    //         }
    //         setUpdateShow(true)
    //     } catch (error) {
    //         console.log(error);
    //         // openNotification("danger", "Malumotlarni olishda xatolik")
    //     }
    // }




    const onDialogClose = () => {
        setDeleteData({})
    }
    const onDialogOk = async () => {
        try {
            let data = await deleteProject(club_id, deleteData._id)
            console.log(data);

            setDeleteData({})
            openNotification("success", "Muvaffaqqiyalti o'chirildi")
            getClients()
        } catch (error) {
            console.log(error);

            openNotification("success", "O'chirishda xatolik")
        }
    }

    const onSelectChange = (value = 0) => {
        setSelectValue(Number(value))
    }

    return (
        <div className='font-mont'>
            <div className="flex flex-row justify-between items-center sticky top-16 dark:bg-gray-800 bg-white py-3">
                <h1 className='text-xl font-mont dark:text-white'>Users</h1>
                <div className="flex gap-2">
                    <Input type="text" onBlur={e => {
                        setSearch(e.target.value)
                    }}
                        placeholder="Izlash..."
                        className={"w-56 max-w-full"}
                    />
                    <ProjectForm openDialog={() => setUpdateShow(true)} show={updateShow} setShow={setUpdateShow} submitNext={getClients} />
                </div>
            </div>
            {

                updateData && updateShow && <ProjectForm openDialog={() => setUpdateShow(true)} show={updateShow} setShow={() => {
                    setUpdateShow(false)
                    setUpdateData({})
                }}
                    projectData={updateData} submitNext={() => {
                        getClients()
                        setUpdateData({})
                    }} />
            }
            {
                Object.keys(deleteData).length ? <Dialog
                    isOpen={Object.keys(deleteData).length}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <h5 className="mb-4">Loyihani o'chirmoqchimisiz</h5>
                    <p>
                        Kanal nomi: {deleteData.channelName}
                    </p>
                    <p>
                        Qo'shimcha izoh: {deleteData.description}
                    </p>
                    <p>
                        Yaratilgan sanasi: {moment(deleteData.createdAt).format("DD-MM-YYYY")}
                    </p>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            Okay
                        </Button>
                    </div>
                </Dialog> : null
            }
            <Table overflow="true" className={"mt-6"}>
                <THead>
                    <Tr>
                        <Th>T/r</Th>
                        <Th>Loyiha nomi</Th>
                        <Th>Loyiha izohi</Th>
                        <Th>
                            <span className="text-center w-full block">Loyihaga a'zolik urli</span>
                        </Th>
                        <Th>
                            <span className="text-center w-full block">Actions</span>
                        </Th>
                    </Tr>
                </THead>
                <TBody>
                    {
                        data?.map(({ channelName, description, botLink, ...project }, index) => {
                            return <Tr>
                                <Td>{((page - 1) * (selectValue)) + index + 1}</Td>
                                <Td>{channelName}</Td>
                                <Td>{description}</Td>
                                <Td> <span className="text-center w-full block">{botLink}</span></Td>
                                <Td>
                                    <span className='flex gap-2'>
                                        <>
                                            <Button variant="danger" size="sm" onClick={() => {
                                                setUpdateData({ channelName, description, botLink, ...project })
                                                setUpdateShow(true)
                                            }} ><BsPen className="text-blue-600" /></Button>
                                            <Button variant="danger" size="sm" ><BsBasket2Fill className="text-red-600" onClick={() => setDeleteData({ channelName, description, botLink, ...project })} /></Button>

                                        </>
                                    </span>
                                </Td>
                            </Tr>
                        })
                    }
                </TBody>
            </Table>


            <div className='flex justify-end relative'>
                <Pagination onChange={(value) => {
                    setPage(value)
                }}
                    total={totalIndex / selectValue}
                    currentPage={page}
                />
                <div className='relative w-[120px]'>
                    <div className='absolute top-0'>
                        <select
                            className='mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent '
                            onChange={(e) => onSelectChange(e.target.value)}
                        >

                            {
                                pageSizeOption.map((page) => (
                                    <option value={page.value}>{page.label}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects