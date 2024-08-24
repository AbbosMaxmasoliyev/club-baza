import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Select, Checkbox, Drawer } from 'components/ui';
import { createManager, updateManager } from '../../services/clubs.service';
import { HiUserCircle } from 'react-icons/hi';
import { openNotification } from 'utils/notification';
import { MultiSelect } from 'primereact/multiselect';
import { useParams } from 'react-router-dom';

const ManagerForm = ({ userData, show, setShow, openDialog, nextSubmit, role }) => {
    const { club_id } = useParams()

    console.log(role);


    const initialValues = {
        full_name: userData?.full_name || '',
        role: userData?.role || role,
        phone_number: userData?.phone_number || '',
        password: userData?.password || '',
    };

    const validationSchema = Yup.object({
        full_name: Yup.string().required('Ismingizni kiriting'),
        role: Yup.string().required('Ismingizni kiriting'),
        phone_number: Yup.string()
            .matches(/^\d{9}$/, 'Telefon raqam 9 raqamdan iborat bo\'lishi kerak')
            .required('Telefon raqamingizni kiriting'),
        password: Yup.string().required('Parolni kiriting'),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (values, error) => {
        console.log(values);

        setIsSubmitting(true);
        try {
            if (userData) {
                await updateManager(userData._id, club_id, values);
                onDialogClose()
                openNotification("success", "Foydalanuvchi muvaffaqiyatli tahrirlandi")
            } else {

                await createManager(values, club_id);
                onDialogClose()
                openNotification("success", "Foydalanuvchi muvaffaqiyatli yaratildi")
            }
            nextSubmit()
        } catch (error) {
            console.error('Xatolik yuz berdi', error);
            alert('Xatolik yuz berdi');
        }
    };

    const onDialogClose = (e) => {
        console.log('onDialogClose', e);
        setShow(false);
        if (nextSubmit) {
            nextSubmit()
        }
    };


    return (
        <div className="max-w-md mx-auto ">
            <Button variant="solid" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2 font-mont' onClick={() => openDialog()}>
                Manager Add
                <HiUserCircle fontSize={20} />
            </Button>

            <Drawer
                isOpen={show}
                width={800}
                lockScroll={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h2 className="text-xl font-semibold mb-4">
                    {userData ? "Admin ma'lutmolarini yangilash" : "Yangi Admin Yaratish"}
                </h2>


                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isValid, errors }) => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="full_name" className="block text-sm font-medium">
                                    To'liq ism
                                </label>
                                <Field
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    className="mt-1 block w-full px-3 py-2 border rounded-md border-gray-500 shadow-sm focus:ring focus:border-gray-900 bg-transparent"
                                />
                                <ErrorMessage name="full_name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>



                            <div className="mb-4">
                                <label htmlFor="phone_number" className="block text-sm font-medium">
                                    Telefon raqam
                                </label>
                                <Field
                                    type="text"
                                    id="phone_number"
                                    name="phone_number"
                                    className="mt-1 block w-full px-3 py-2 border rounded-md border-gray-500 shadow-sm focus:ring focus:border-gray-900 bg-transparent"
                                />
                                <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm mt-1" />
                            </div>






                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Parol
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 block w-full px-3 py-2 border rounded-md border-gray-500 shadow-sm focus:ring focus:border-gray-900 bg-transparent"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 dark:text-white py-2 rounded-md"
                            >
                                {isSubmitting ? 'Yuklanmoqda...' : userData ? 'Yangilash' : 'Yaratish'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Drawer>
        </div>
    );
};

export default ManagerForm;
