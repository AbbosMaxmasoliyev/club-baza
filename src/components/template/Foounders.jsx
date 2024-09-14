import { Button, Dialog, Input, Pagination, Select, Spinner } from 'components/ui'
import Table from 'components/ui/Table'
import { useEffect, useState } from 'react'
import { BsBasket2Fill, BsPen, BsPenFill } from 'react-icons/bs'
import { CgEditBlackPoint, CgEditExposure, CgEditFlipV, CgEditHighlight, CgEditStraight } from 'react-icons/cg'
import { formattedPhoneNumber } from 'utils/formatted'
import getUpdateInformation from './UpdateForm'
import { clientGetById, createCleint, deleteUser, getManagers, getUsers } from 'services/client.service'
import { openNotification } from 'utils/notification'
import UpdateUser from './UpdateForm'
import CreateUser from './CreateUser'
// import { getManagers, managerGetById } from 'services/client.service'
import ManagerForm from './Manager'
import { managerData } from "../../data"
import { permission } from 'configs/navigation.config'
import SelectView from './CardInfo'
import { useParams } from 'react-router-dom'
const { Tr, Th, Td, THead, TBody } = Table




const pageSizeOption = [
    { value: 5, label: '5 / page' },
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
]

const Founder = ({ role, view }) => {
    const { club_id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    const [totalIndex, setTotal] = useState(10)
    const [selectValue, setSelectValue] = useState(10)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")



    const [updateData, setUpdateData] = useState(null)
    const [updateId, setUpdateId] = useState(null)
    const [updateShow, setUpdateShow] = useState(false)
    const [deleteData, setDeleteData] = useState({})

    const getFounderTable = async (query) => {
        try {
            setLoading(true)
            let managersResponse = await getManagers(query)
            setLoading(false)
            console.log(managersResponse);
            setData(managersResponse.data.menejers.filter(menejer => menejer.role === role))
            setTotal(managersResponse.data.total)
        } catch (error) {

        }
    }

    useEffect(() => {
        return () => {
            setData([])
        }
    }, [])



    useEffect(() => {
        getFounderTable(`?page=${page}&item=${selectValue}&club_id=${club_id}`)
        console.log(view);

    }, [search, view])





    const onDialogClose = () => {
        setDeleteData({})

    }
    const onDialogOk = async () => {
        try {
            let data = await deleteUser(deleteData?._id, club_id)
            console.log(data);
            setDeleteData({})
            openNotification("success", "Muvaffaqqiyalti o'chirildi")
            getFounderTable(`?page=${page}&item=${selectValue}&club_id=${club_id}`)

        } catch (error) {
            openNotification("success", "O'chirishda xatolik")
        }
    }

    const onSelectChange = (value = 0) => {
        setSelectValue(Number(value))
    }
    if (loading) {
        return (
            <div className="w-full h-[450px] flex justify-center items-center ">
                <Spinner size="3.25rem" />
            </div>
        )

    }
    return (
        <div className='font-mont min-h-auto mb-5'>

            <div className="flex flex-row justify-between items-center sticky top-16 dark:bg-gray-800 bg-white py-3">
                <h1 className='text-xl font-mont dark:textwhite'>{role === "founder" ? "Asoschi" : role === "menejer" ? "Support" : "Users"}</h1>
                <div className="flex gap-2">
                    <Input type="text" onBlur={e => {
                        setSearch(e.target.value)
                    }}
                        placeholder="Izlash..."
                        className={"w-56 max-w-full"}
                    />
                    <ManagerForm role={role} openDialog={() => setUpdateShow(true)} setShow={setUpdateShow} userData={updateData} show={updateShow} nextSubmit={() => getFounderTable(`?page=${page}&item=${selectValue}&club_id=${club_id}`)} />
                </div>
            </div>
            {
                updateShow && updateData ? <ManagerForm userData={updateData} removeId={setUpdateId} setShow={setUpdateShow} nextSubmit={() => {
                    setUpdateData(null)
                    getFounderTable(`?page=${page}&item=${selectValue}&club_id=${club_id}`)
                }} show={updateShow} /> : null
            }
            {
                Object.keys(deleteData).length ? <Dialog
                    isOpen={Object.keys(deleteData).length}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <h5 className="mb-4">Foydalanuvchini o'chirmoqchimisiz</h5>
                    <p>
                        Ismi: {deleteData?.full_name}
                    </p>
                    <p>
                        Telefoni: {deleteData?.phone_number}
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
            {data ?
                <>
                    <Table className={""} overflow="true">
                        <THead>
                            <Tr>
                                <Th>T/r</Th>
                                <Th>F.I.O</Th>
                                <Th>Telefon raqami</Th>
                                <Th>
                                    Password
                                </Th>
                                <Th>
                                    <span className="text-center w-full block">
                                        Region
                                    </span>
                                </Th>
                            </Tr>
                        </THead>
                        <TBody className={""}>
                            {
                                data?.map((user, index) => {


                                    return <Tr>
                                        <Td>{index + 1}</Td>
                                        <Td>{user?.full_name}</Td>
                                        <Td>{formattedPhoneNumber(`${user?.phone_number}`)}</Td>
                                        <Td>{user?.password}</Td>
                                        <Td>

                                            <Td>
                                                <span className='flex gap-2'>
                                                    {permission instanceof Array && (permission.includes("superadmin")) ?
                                                        <>
                                                            <Button variant="danger" size="sm" onClick={() => {

                                                                setUpdateData(user)
                                                                setUpdateShow(true)
                                                            }} >
                                                                <BsPen className="text-blue-600" />
                                                            </Button>

                                                            <Button variant="danger" size="sm" >
                                                                <BsBasket2Fill className="text-red-600" onClick={() => setDeleteData(user)} /></Button>


                                                        </> :
                                                        <Button variant="danger" size="sm" onClick={() => {
                                                            setUpdateId(user?._id)
                                                        }} ><BsPen className="text-blue-600" /></Button>
                                                    }
                                                </span>
                                            </Td>
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
                                    className='mt-1 block w-full px-3 py-2 border rounded-md border-gray-500 shadow-sm focus:ring focus:border-gray-900 bg-transparent'
                                    isSearchable={false}
                                    onChange={(e) => onSelectChange(e.target.value)}
                                >
                                    {
                                        pageSizeOption.map(select => <option value={select.value}>{select.label}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </> : <h3>Hozircha menejerlar yo'q</h3>}

        </div>
    )
}

export default Founder
