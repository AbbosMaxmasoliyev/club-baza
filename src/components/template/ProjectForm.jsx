import { useEffect, useState } from 'react'
import Button from 'components/ui/Buttons'
import Dialog from 'components/ui/Dialog'
import { HiMinus, HiUserCircle } from 'react-icons/hi'
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
import FormItem from 'components/ui/Form/FormItem'
import * as Yup from "yup";
import { Card, DatePicker, Drawer, FormContainer, Input, Tooltip } from 'components/ui';
import Table from "components/ui/Table"
import { openNotification } from 'utils/notification';
import ToastWrapper from 'components/ui/toast/ToastWrapper';
import SaleForm from './SaleForm';
import { createProject, getUsers, updateProject, updateSubscribe } from 'services/client.service';
import { getStringDate } from 'utils/generate';
import { getProductAll } from 'services/product.service';
import { getTimeValues } from 'components/ui/TimeInput/utils';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const { Tr, Th, Td, THead, TBody } = Table
const ProjectForm = ({ setShow, submitNext, show, projectData = {}, openDialog }) => {
    const { club_id } = useParams()
    console.log(projectData);

    const [product, setProduct] = useState(null)

    const initialValues = {

        "channelName": projectData?.channelName || "",
        "channelId": projectData?.channelId || "",
        "prices": projectData?.prices || [{}],
        "description": projectData?.description || "",
        "monthly": projectData?.monthly || false,
        "botLink": projectData?.botLink || ""

    };





    const [dialogIsOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disableFor, setDisabledFor] = useState(true);



    const onDialogClose = (e) => {
        console.log('onDialogClose', e);
        setShow();
    };

    useEffect(() => {
        // getProductsForUpdate()
        return () => {
            setDisabled(false)
        };
    }, []);

    const onSubmit = async (values, error) => {
        console.log();

        setDisabled(true);
        setDisabledFor(false);
        if (!Object.keys(projectData).length) {

            try {
                let respUser = await createProject(club_id, values);
                console.log(respUser);

                openNotification("success", "Proyekt muvaffaqqiyatli yangilandi");
                onDialogClose();
                getUsers(null)
                submitNext()

            } catch (error) {
                console.log(error);

                openNotification("danger", "Xatolik bor");
            }
            setDisabled(false);
        } else {
            try {
                console.log({ club_id, projectData, values });

                let respUser = await updateProject(club_id, projectData._id, values);
                console.log(respUser);

                openNotification("success", "Proyekt muvaffaqqiyatli yangilandi");
                onDialogClose();
                getUsers(null)
                submitNext()

            } catch (error) {
                openNotification("danger", "Xatolik bor");
            }
            setDisabled(false);
        }
    };

    const fieldFeedback = (form, name) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return {
            errorMessage: error || '',
            invalid: typeof touch === 'undefined' ? false : error && touch,
        };
    };




    const validationSchema = Yup.object({
        channelName: Yup.string().required('Kanal nomi majburiy'),
        channelId: Yup.string().required('Kanal ID majburiy'),
        description: Yup.string().required('Tavsif majburiy'),
        botLink: Yup.string().required('Foydalanuvchi nomi majburiy'),
        monthly: Yup.boolean(),
        prices: Yup.array().of(
            Yup.object({
                duration: Yup.number().required('Davomiylik majburiy'),
                price: Yup.number().required('Narx majburiy'),
            })
        ),
    });
    return (
        <div>
            <Button variant="solid" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2 font-mont' onClick={() => openDialog()}>
                Loyiha qo'shish
                <HiUserCircle fontSize={20} />
            </Button>
            <Drawer
                isOpen={show}
                width={600}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                lockScroll={false}
            >
                <div className="mx-auto p-6 shadow-md rounded-md  font-mont ">
                    <div className="w-full flex flex-row items-start">
                        <div className="flex flex-col justify-center gap-6 w-9/12">
                            <h2 className="text-2xl font-bold mb-6">Malumotlarni yangilash</h2>
                            {/* <Card>
                                <p>To'liq ismi: {`${projectData.user.firstName} ${projectData.user.lastName}`}</p>
                                <p>Obuna bo'lgan loyihasi: {`${projectData.project.channelName}`}</p>
                                <p>To'lov qilish sanasi: {moment(projectData.nextPaymentDate).format("DD-MM-YYYY")}</p>
                                <p>Qancha vaqt o'tgan: {moment(projectData.nextPaymentDate).fromNow()}</p>
                            </Card> */}
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ values }) => (
                                    <Form className="flex flex-row flex-wrap flex-2 gap-4">
                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="channelName" className="block text-sm font-medium">
                                                Kanal nomi
                                            </label>
                                            <Field
                                                type="text"
                                                id="channelName"
                                                name="channelName"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent"
                                            />
                                            <ErrorMessage
                                                name="channelName"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="channelId" className="block text-sm font-medium">
                                                Kanal ID
                                            </label>
                                            <Field
                                                type="text"
                                                id="channelId"
                                                name="channelId"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent"
                                            />
                                            <ErrorMessage
                                                name="channelId"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="description" className="block text-sm font-medium">
                                                Tavsif
                                            </label>
                                            <Field
                                                type="text"
                                                id="description"
                                                name="description"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent"
                                            />
                                            <ErrorMessage
                                                name="description"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="monthly" className="block text-sm font-medium">
                                                Oylik holati
                                            </label>
                                            <Field
                                                type="checkbox"
                                                id="monthly"
                                                name="monthly"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent"
                                            />
                                            <ErrorMessage
                                                name="monthly"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="botLink" className="block text-sm font-medium">
                                                Foydalanuvchi nomi
                                            </label>
                                            <Field
                                                type="text"
                                                id="botLink"
                                                name="botLink"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent"
                                            />
                                            <ErrorMessage
                                                name="botLink"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>



                                        <FieldArray name="prices">
                                            {({ push, remove }) => (
                                                <div className="mb-4 w-full">
                                                    <label className="block text-sm font-medium">Narxlar</label>
                                                    {values?.prices.map((price, index) => (
                                                        <div key={index} className="flex items-center gap-2 mb-2">
                                                            <div className="flex-1">
                                                                <Field
                                                                    type="number"
                                                                    name={`prices[${index}].duration`}
                                                                    placeholder="Davomiylik (oylar)"
                                                                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent"
                                                                />
                                                                <ErrorMessage
                                                                    name={`prices[${index}].duration`}
                                                                    component="div"
                                                                    className="text-red-500 text-sm mt-1"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <Field
                                                                    type="number"
                                                                    name={`prices[${index}].price`}
                                                                    placeholder="Narx"
                                                                    className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent"
                                                                />
                                                                <ErrorMessage
                                                                    name={`prices[${index}].price`}
                                                                    component="div"
                                                                    className="text-red-500 text-sm mt-1"
                                                                />
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="text-red-500"
                                                            >
                                                                O'chirish
                                                            </Button>
                                                        </div>
                                                    ))}
                                                    <Button
                                                        type="button"
                                                        onClick={() => push({ duration: '', price: '', _id: '' })}
                                                        className="mt-2"
                                                    >
                                                        Yangi narx qo'shish
                                                    </Button>
                                                </div>
                                            )}
                                        </FieldArray>

                                        <div className="w-full justify-start flex">
                                            <Button
                                                size="sm"
                                                className="ltr:mr-2 rtl:ml-2"
                                                variant="solid"
                                                loading={disabled}
                                                disabled={!disableFor}
                                                type="submit"
                                            >
                                                Saqlash
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </Drawer>
            <ToastWrapper />
        </div>
    )
};

export default ProjectForm;
