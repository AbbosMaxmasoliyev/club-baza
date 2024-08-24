import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import useStoreModal from 'store/modal';
import {useTranslation} from "react-i18next";

const ModalConfirmation = ({ changeActivate }) => {
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
      const response = await changeActivate(data.id);
      return  { response }; ; // Return the response from removeAgreement
    } catch (error) {
      console.error(error);
      return { error }; // Return error response
    }
  }

	const onChange = async () => {
		toggleModalConfirmation(false);
		const success = await changeProduct({id: selecteModal})
		if (!success.response.success) {
			toast.push(
				<Notification title={`${success.response.error.message}`} type="danger" duration={3500}>
					{t('notification.error')}
				</Notification>
				,{
					placement: 'top-center'
				}
			)
		} else {
    	toast.push(
				<Notification title={t('secret_question_lang.alert_mes.activated_secret_question')} type="success" duration={2500}>
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
			title={t('secret_question_lang.alert_mes.activate_secret_question')}
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

export default ModalConfirmation