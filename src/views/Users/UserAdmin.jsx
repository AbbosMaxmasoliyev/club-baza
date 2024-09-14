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
import { clientGetById, createCleint, deleteUser, getUsers } from 'services/client.service'
import { openNotification } from 'utils/notification'
import UpdateUser from '../../components/template/UpdateForm'
import CreateUser from '../../components/template/CreateUser'
import moment from 'moment/moment'
import { permission } from 'configs/navigation.config'

const { Tr, Th, Td, THead, TBody } = Table




const pageSizeOption = [
    { value: 100, label: '100 / page' },
    { value: 200, label: '200 / page' },
    { value: 300, label: '300 / page' },
]


const UsersAdmin = ({ url }) => {
    const { club_id } = useParams()
    console.log(club_id);

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

    const getClients = async (query) => {
        try {
            let resp = await getUsers(query)
            console.log(resp.data.subscriptions);

            setData(resp.data.subscriptions)
            setTotal(resp.data.total)

        } catch (error) {

        }
    }






    useEffect(() => {
        getClients(`?page=${page}&item=${selectValue}${search ? `&search=${search}` : ""}&club_id=${club_id}`)
    }, [selectValue, page, search])

    const getUpdateInformation = async (idData) => {
        try {
            let updateResponse = await clientGetById(idData)
            console.log(updateResponse);
            if (updateResponse.data.relatedClients) {

                setUpdateData(updateResponse.data.relatedClients)
            } else {
                setUpdateData(updateResponse.data.client)
            }
            setUpdateShow(true)
        } catch (error) {
            console.log(error);
            // openNotification("danger", "Malumotlarni olishda xatolik")
        }
    }




    const onDialogClose = () => {
        setDeleteData({})
    }
    const onDialogOk = async () => {
        try {
            let data = await deleteUser(deleteData._id)
            setDeleteData({})
            openNotification("success", "Muvaffaqqiyalti o'chirildi")
            getUpdateInformation()
        } catch (error) {
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
                    <CreateUser />
                </div>
            </div>
            {
                updateShow && updateData ? <UpdateUser subscription_id={updateData._id} userData={updateData} removeId={setUpdateId} setShow={setUpdateShow} show={updateShow} submitNext={() => {
                    setUpdateData(null)
                    setUpdateShow(null)
                    getClients(`?page=${1}&item=${selectValue}${search ? `&search=${search}` : ""}&club_id=${club_id}`)
                }} /> : null
            }
            {
                Object.keys(deleteData).length ? <Dialog
                    isOpen={Object.keys(deleteData).length}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <h5 className="mb-4">Foydalanuvchini o'chirmoqchimisiz</h5>
                    <p>
                        Ismi: {deleteData.full_name}
                    </p>
                    <p>
                        Telefoni: {deleteData.phone_number}
                    </p>
                    <p>
                        Tug'ilgan sanasi: {deleteData.birthday}
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
                        <Th>F.I.O</Th>
                        <Th>Telefon raqami</Th>
                        <Th>
                            <span className="text-center w-full block">A'zo klub nomi</span>
                        </Th>
                        <Th>
                            <span className="text-center w-full block">To'lov sanasi</span>
                        </Th>
                        <Th>
                            <span className="text-center w-full block">
                                Region
                            </span>
                        </Th>
                    </Tr>
                </THead>
                <TBody>
                    {
                        data?.map(({ user, project, nextPaymentDate, ...subscription }, index) => {
                            return <Tr>
                                <Td>{((page - 1) * (selectValue)) + index + 1}</Td>
                                <Td>{`${user?.firstName} ${user?.lastName}`}</Td>
                                <Td>{formattedPhoneNumber(user?.phoneNumber)}</Td>
                                <Td> <span className="text-center w-full block">{project?.channelName}</span></Td>
                                <Td>{moment(nextPaymentDate).format("DD-MM-YYYY")}</Td>
                                <Td>
                                    <span className='flex gap-2'>
                                        {permission?.includes("menejer") ?
                                            <>
                                                <Button variant="danger" size="sm" onClick={() => {
                                                    setUpdateData({ user, project, nextPaymentDate, ...subscription })
                                                    setUpdateShow(true)
                                                }} ><BsPen className="text-blue-600" /></Button>
                                                <Button variant="danger" size="sm" ><BsBasket2Fill className="text-red-600" onClick={() => setDeleteData(user)} /></Button>

                                            </> :
                                            <Button variant="danger" size="sm" onClick={() => {

                                                setUpdateData({ user, project, nextPaymentDate, ...subscription })
                                                setUpdateShow(true)
                                            }} ><BsPen className="text-blue-600" /></Button>
                                        }
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

export default UsersAdmin