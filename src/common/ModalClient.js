import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import useStoreModal from 'store/modal';
import {useTranslation} from "react-i18next";
import {dataHandler} from "../views/Client/components/ClientTable";

const ModalConfirmationClient = ({ fetchResetActivity }) => {
  const {
    deleteConfirmation: dialogOpen,
    toggleModalConfirmation,
		selecteModal
  } = useStoreModal();

	const onDialogClose = () => {
    toggleModalConfirmation(false)
	}
	const { t } = useTranslation();

  const changeProduct = async (data) => {
    try {
      const response = await fetchResetActivity([data.id]);
      return  { response };
    } catch (error) {
      console.error(error);
      return { error }; // Return error response
    }
  }

	const onChange = async () => {
		toggleModalConfirmation(false);
		const success = await changeProduct({id: selecteModal})
		if (!success.response?.data?.success) {
			toast.push(
				<Notification title={`${success?.response?.error?.message}`} type="danger" duration={3500}>
					{t('notification.error')}
				</Notification>
				,{
					placement: 'top-center'
				}
			)
		} else {
    	toast.push(
				<Notification title={`${t('client.reset_activity')} - ${dataHandler(success?.response?.data?.lastActivity) }`} type="success" duration={3500}>
				</Notification>
				,{
					placement: 'top-center'
				}
			)
    }
	}

	return (
		<ConfirmDialog
			isOpen={dialogOpen}
			onClose={onDialogClose}
			onRequestClose={onDialogClose}
			type="info"
			title={t('client.want_to_reset_activity')}
			onCancel={onDialogClose}
			onConfirm={onChange}
			confirmButtonColor="blue-600"
		>
			<p>
				{t('secret_question_lang.alert_mes.are_you_sure')}
			</p>
		</ConfirmDialog>
	)
}

export default ModalConfirmationClient