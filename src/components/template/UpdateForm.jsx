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
import { getUsers } from 'services/client.service';
import { getStringDate } from 'utils/generate';
import { getProductAll } from 'services/product.service';
import { getTimeValues } from 'components/ui/TimeInput/utils';
import moment from 'moment';
import { updateSubscribe } from 'services/founder-menejer.service';
import { updateSubscribeAdmin } from 'services/clubs.service';
import { useParams } from 'react-router-dom';

const { Tr, Th, Td, THead, TBody } = Table
const UpdateUser = ({ setShow, submitNext, show, userData, subscription_id = "" }) => {
    const { club_id } = useParams()
    console.log(setShow, submitNext, show, userData, subscription_id);

    const role = localStorage.getItem("role")
    const [product, setProduct] = useState(null)

    const initialValues = {
        nextPaymentDate: "",
    };




    const validationSchema = Yup.object({
        nextPaymentDate: Yup.string().required("Keyingi to'lov vaqtini kiriting"),
    });

    const [dialogIsOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disableFor, setDisabledFor] = useState(true);



    const onDialogClose = (e) => {
        console.log('onDialogClose', e);
        setShow(false);
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
        if (role === "manager") {

            try {
                let respUser = await updateSubscribe(userData._id, { nextPaymentDate: new Date(values.nextPaymentDate).getTime() });
                console.log(respUser);

                openNotification("success", "User muvaffaqqiyatli yangilandi");
                onDialogClose();
                getUsers(null)
                submitNext()

            } catch (error) {
                openNotification("danger", "Xatolik bor");
            }
        } else if (role === "superadmin") {
            try {
                let respUser = await updateSubscribeAdmin(subscription_id, club_id, { nextPaymentDate: new Date(values.nextPaymentDate).getTime() });
                console.log(respUser);

                openNotification("success", "User muvaffaqqiyatli yangilandi");
                onDialogClose();
                getUsers(null)
                submitNext()

            } catch (error) {
                openNotification("danger", "Xatolik bor");
            }
        }
        setDisabled(false);
    };

    const fieldFeedback = (form, name) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return {
            errorMessage: error || '',
            invalid: typeof touch === 'undefined' ? false : error && touch,
        };
    };

    return (
        <div>

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
                            <Card>
                                <p>To'liq ismi: {`${userData?.user.firstName} ${userData.user.lastName}`}</p>
                                <p>Obuna bo'lgan loyihasi: {`${userData?.project.channelName}`}</p>
                                <p>To'lov qilish sanasi: {moment(userData?.nextPaymentDate).format("DD-MM-YYYY")}</p>
                                <p>Qancha vaqt o'tgan: {moment(userData?.nextPaymentDate).fromNow()}</p>
                            </Card>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                className="w-6/12"
                            >
                                {({ setFieldValue, values, errors }) => {
                                    console.log(errors);

                                    const relatives = values.relatives;

                                    return (
                                        <Form className='flex flex-row flex-wrap flex-2 gap-4'>
                                            <div className="mb-4 w-5/12">
                                                <label htmlFor="nextPaymentDate" className="block text-sm font-medium">
                                                    To'liq ism
                                                </label>
                                                <Field
                                                    type="datetime-local"
                                                    autoComplete={"off"}

                                                    id="nextPaymentDate"
                                                    name="nextPaymentDate"
                                                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                                />
                                                <ErrorMessage
                                                    name="nextPaymentDate"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1"
                                                />
                                            </div>



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
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </Drawer>
            <ToastWrapper />
        </div>
    )
};

export default UpdateUser;
