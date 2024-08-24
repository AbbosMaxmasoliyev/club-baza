import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import useStoreRemove from 'store/remove';
import {useTranslation} from "react-i18next";
import useStoreProductType from "../views/Products/ProductTypes/components/ProductTypeNew/store/product-type";

const CommonDeleteConfirmation = ({ removeFromApi, title }) => {
  const {
    selectedProduct,
    deleteConfirmation: dialogOpen,
    toggleDeleteConfirmation,
  } = useStoreRemove();
	const { delActionData} = useStoreProductType();

	const onDialogClose = () => {
		  toggleDeleteConfirmation(false)
	}
	const { t } = useTranslation();
  const deleteProduct = async (data) => {
    try {
      const response = await removeFromApi(data.id);
      return  { response }; // Return the response from removeAgreement
    } catch (error) {
      console.error(error);
      return { error }; // Return error response
    }
  }


	const onDelete = async () => {
		toggleDeleteConfirmation(false);
		const success = await deleteProduct({id: selectedProduct})
		delActionData(selectedProduct);
		if (!success.response.success) {
			toast.push(
				<Notification title={`${success.response.error.message}`} type="danger" duration={3500}>
				</Notification>
				,{
					placement: 'top-center'
				}
			)
		} else {
    	toast.push(
				<Notification title={t('modal_message.success_delete_mess')} type="success" duration={2500}>
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
			type="danger"
			title={`${t('modal_message.delete_mess_title')} ${title}`}
			onCancel={onDialogClose}
			onConfirm={onDelete}
			confirmButtonColor="red-600"
		>
			<p>
				{t('modal_message.delete_mess_text')}
				
			</p>
		</ConfirmDialog>
	)
}

export default CommonDeleteConfirmation