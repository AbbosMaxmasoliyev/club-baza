import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Select, Checkbox, Drawer } from 'components/ui';
import { createClub, createManager, updateClub, updateManager } from '../../services/clubs.service';
import { HiUserCircle } from 'react-icons/hi';
import { openNotification } from 'utils/notification';

const ClubForm = ({ clubData, show, setShow, openDialog, nextSubmit, isUpdate }) => {
    console.log(clubData);
    console.log(clubData);

    const initialValues = {
        name: clubData?.name || '',
        bot_username: clubData?.bot_username || '',
        url: clubData?.url || '',

    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Ismingizni kiriting'),
        url: Yup.string().required('Kanal IDsini kiriting'),
        bot_username: Yup.string().required('Bot linkini kiriting'),
        // image: Yup.mixed()
        //     .test("fileType", "Faqat rasm fayllariga ruxsat", (value) => {
        //         if (!value) return true; // Agar rasm yuklanmagan bo'lsa, OK
        //         const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
        //         return allowedFormats.includes(value.type);
        //     })
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (values, error) => {
        console.log(error);

        setIsSubmitting(true);
        try {
            if (clubData) {
                let resp = await updateClub(clubData._id, values);
                console.log(resp);

                onDialogClose()
                openNotification("success", "Foydalanuvchi muvaffaqiyatli tahrirlandi")
            } else {

                let resp = await createClub(values);
                console.log(resp);

                onDialogClose()
                openNotification("success", "Foydalanuvchi muvaffaqiyatli yaratildi")
            }
        } catch (error) {
            console.error('Xatolik yuz berdi', error);
            alert('Xatolik yuz berdi');
        } finally {
            setIsSubmitting(false);
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
                Club qo'shish
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
                    {clubData ? 'Clubni Yangilash' : 'Yangi Clubni Yaratish'}
                </h2>


                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ isValid, errors }) => (
                        <Form>
                            <div className='flex flex-col gap-2 my-5'>
                                <label htmlFor="name" className='font-bold text-white'>Loyiha nomi</label>
                                <Field className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent " name="name" type="text" />
                                <ErrorMessage name="name" className='text-red-600' component="div" />
                            </div>


                            <div className='flex flex-col gap-2 my-5'>
                                <label htmlFor="bot_username" className='font-bold text-white'>Bot havolasi</label>
                                <Field className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent " name="bot_username" type="text" />
                                <ErrorMessage name="bot_username" className='text-red-600' component="div" />
                            </div>



                            <div className='flex flex-col gap-2 my-5'>
                                <label htmlFor="url" className='font-bold text-white'>URL</label>
                                <Field className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent " name="url" as="input" />
                                <ErrorMessage name="url" className='text-red-600' component="div" />
                            </div>
                            <Button type="submit" variant="solid" >
                                {isUpdate ? "Yangilash" : "Yaratish"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Drawer>
        </div>
    );
};

export default ClubForm;
