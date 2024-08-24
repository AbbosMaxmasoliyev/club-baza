import { Button, Dialog, Input, Pagination } from 'components/ui'
import Table from 'components/ui/Table'
import { useEffect, useState } from 'react'
import { BsBasket2Fill, BsFillEnvelopeOpenFill, BsOpencollective, BsPen, } from 'react-icons/bs'
import { deleteUser } from 'services/client.service'
import { openNotification } from 'utils/notification'
import { apiGetClubs, deleteClub, getClubs, getManagers, managerGetById } from 'services/clubs.service'
import ClubForm from './ClubForm'
import { clubData } from 'data'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { FaBoxOpen, FaOpencart } from 'react-icons/fa'

const { Tr, Th, Td, THead, TBody } = Table




const pageSizeOption = [
    { value: 5, label: '5 / page' },
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
]

const Clubs = () => {
    const navigation = useNavigate()

    const [data, setData] = useState(null)

    const [totalIndex, setTotal] = useState(10)
    const [selectValue, setSelectValue] = useState(10)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")



    const [updateData, setUpdateData] = useState(null)
    const [updateId, setUpdateId] = useState(null)
    const [updateShow, setUpdateShow] = useState(false)
    const [deleteData, setDeleteData] = useState({})

    const getClubsData = async (query) => {
        try {
            let managersResponse = await getClubs(query)
            console.log(managersResponse);

            setData(managersResponse.data.clubs)
            setTotal(managersResponse.data.total)
        } catch (error) {

        }
    }

    useEffect(() => {
        // setData(clubData)
        getClubsData(`?page=${page}&item=${selectValue}`)
    }, [])


    useEffect(() => {
        getClubsData(`?page=${page}&item=${selectValue}&search=${search}`)
    }, [search])

    const getUpdateInformation = async (id) => {
        try {
            let updateResponse = await apiGetClubs(id)
            console.log(updateResponse);

            setUpdateData(updateResponse.data.client)

            setUpdateShow(true)
        } catch (error) {
            console.log(error);
            // openNotification("danger", "Malumotlarni olishda xatolik")
        }
    }
    // useEffect(() => {
    //     if (updateId) {
    //         getUpdateInformation(updateId)
    //     } else {
    //         getUpdateInformation()
    //     }
    // }, [updateId])

    useEffect(() => {
        if (updateData && Object.keys(updateData).length) {
            setUpdateShow(true)
        } else {
            setUpdateShow(false)

        }
    }, [updateData])



    const onDialogClose = () => {
        setDeleteData({})
    }
    const onDialogOk = async () => {
        try {
            let data = await deleteClub(deleteData._id)
            console.log(data);

            setDeleteData({})
            openNotification("success", "Muvaffaqqiyalti o'chirildi")
            getClubsData(`?page=${page}&item=${selectValue}`)
        } catch (error) {
            openNotification("success", "O'chirishda xatolik")
        }
    }

    const onSelectChange = (value = 0) => {
        setSelectValue(Number(value))
    }

    return (
        <div className='font-mont min-h-screen'>

            <div className="flex flex-row justify-between items-center sticky top-16 dark:bg-gray-800 bg-white py-3">
                <h1 className='text-xl font-mont dark:textwhite'>Clubs</h1>
                <div className="flex gap-2">
                    <Input type="text" onBlur={e => {
                        setSearch(e.target.value)
                    }}
                        placeholder="Izlash..."
                        className={"w-32"}
                    />
                    <ClubForm
                        openDialog={() => setUpdateShow(true)}
                        setShow={setUpdateShow}
                        // userData={updateData}
                        show={updateShow}
                        nextSubmit={() => getClubsData(`?page=${page}&item=${selectValue}`)}
                    />
                </div>
            </div>
            {
                updateShow && updateData ? <ClubForm clubData={updateData} removeId={setUpdateId} isUpdate={true} setShow={setUpdateShow} nextSubmit={() => {
                    setUpdateData(null)
                    getClubsData(`?page=${page}&item=${selectValue}`)
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
                        Nomi: {deleteData.name}
                    </p>
                    <p>
                        Yaratilgan sanasi: {moment(deleteData.createdAt).format("DD-MM-YYYY")}
                    </p>
                    <p>
                        Bot usernmae: {deleteData.bot_username}
                    </p>
                    <p>
                        Backend URL: {deleteData.url}
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
                                <Th>Nomi</Th>
                                <Th>Qo'shimcha ma'lumot</Th>
                                <Th>Kanal nomi</Th>
                                <Th>Proyekt soni</Th>

                                <Th>
                                    Actions
                                </Th>
                            </Tr>
                        </THead>
                        <TBody className={""}>
                            {
                                data?.map((club, index) => {
                                    return <Tr>
                                        <Td>{index + 1}</Td>
                                        <Td>{club?.name}</Td>
                                        <Td>{club?.url}</Td>
                                        <Td>{club?.bot_username}</Td>
                                        <Td>{club?.projects?.length}</Td>
                                        {/* <Td>
                                            <p
                                                className='truncate w-[100px] text-ellipsis'

                                            >
                                                {club.projectId}
                                            </p>
                                        </Td> */}
                                        <Td>
                                            <span className='flex gap-2'>
                                                {club.status ?
                                                    <>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => {
                                                                setUpdateId(club._id)
                                                                setUpdateData(club)

                                                            }}
                                                        >
                                                            <BsPen className="text-blue-600" />
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => setDeleteData(club)}
                                                        >
                                                            <BsBasket2Fill
                                                                className="text-red-600"
                                                            />
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => navigation(`/club/${club._id}`)}
                                                        >
                                                            <FaBoxOpen
                                                                className="text-green-600"
                                                            />
                                                        </Button>

                                                    </> :
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => {
                                                            setUpdateData(club)
                                                            setUpdateId(club._id)
                                                        }}
                                                    >
                                                        <BsPen className="text-blue-600" />
                                                    </Button>
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

export default Clubs
