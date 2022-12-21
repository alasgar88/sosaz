import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Form, Modal as AntModal } from 'antd';
import ConfirmModal from './ConfirmModal';
import { FORM_CANCEL, FORM_CONFIRM } from '../../../utils/forms';
import { useDispatch } from 'react-redux';

const FormModal = (
  { title, titleEdit, onSubmit, children, onEdit, onCloseClick },
  ref
) => {
  const { useForm } = Form;
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const closeModal = () => {
    if (form.isFieldsTouched()) {
      onCloseClick && onCloseClick();
      return setConfirmModal(true);
    }
    onCloseClick && onCloseClick();
    return setIsVisible(false);
  };

  const onFinalCancel = useCallback(() => {
    form.resetFields();
    setIsVisible(false);
    onCloseClick && onCloseClick();
  }, [form]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsVisible(true);
      setIsEditing(false);
      form.resetFields();
    },
    close: () => {
      setIsEditing(false);
      closeModal();
      onCloseClick();
    },
    setEdit: (data) => {
      setIsVisible(true);
      setIsEditing(true);
      form.setFieldsValue(data);
    },
    isEditing: () => {
      return isEditing;
    },
    resetFormField: () => {
      form.resetFields();
    },
  }));

  const onFormSubmit = useCallback(() => {
    const data = form.getFieldsValue();
    console.log(data, 'datafrom from');

    setIsLoading(true);
    if (isEditing && onEdit !== undefined) {
      setIsLoading(true);
      console.log(data, 'data from formdal');
      onEdit(data)
        .then(() => setIsLoading(true))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);

      onSubmit(data)
        .then(() => {
          form.resetFields();
          setIsLoading(true);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [form, onEdit, onSubmit]);

  return (
    <>
      <ConfirmModal
        toggle={setConfirmModal}
        onOk={onFinalCancel}
        confirmModal={confirmModal}
      />
      <AntModal
        transitionName=''
        width={window.screen.width * 0.5}
        okText={FORM_CONFIRM}
        cancelText={FORM_CANCEL}
        title={isEditing ? titleEdit : title}
        open={isVisible}
        onOk={form.submit}
        onCancel={closeModal}
        destroyOnClose={confirmModal}
        mask={true}
        maskClosable={true}
      >
        <Form
          disabled={isLoading}
          onFinish={onFormSubmit}
          layout='vertical'
          form={form}
        >
          {children?.(isEditing)}
        </Form>
      </AntModal>
    </>
  );
};

export default forwardRef(FormModal);
