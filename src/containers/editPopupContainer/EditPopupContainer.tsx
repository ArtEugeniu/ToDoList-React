import EditPopup from "../../components/editPopup/EditPopup";
import { useAppSelector } from '../../hooks/hooks';
import { useState, useEffect } from 'react';

const EditPopupContainer: React.FC = () => {

  const [inputsValue, setInputsValue] = useState<{ title: string, description: string }>({
    title: '',
    description: ''
  })

  const editPopupState = useAppSelector(state => state.popups);
  const taskList = useAppSelector(state => state.taskList);

  useEffect(() => {
    const taskData = taskList.find(item => item.id === editPopupState.id);
    if (taskData) {
      setInputsValue({
        title: taskData.title,
        description: taskData.description
      })
    } else {
      setInputsValue({
        title: '',
        description: ''
      });
    }
  }, [editPopupState.isOpen, editPopupState.id, taskList])

  const handleEditInputs = (value: string, name: string) => {
    setInputsValue(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }



  return (

    <EditPopup inputsValue={inputsValue} editPopupState={editPopupState} onInputChange={handleEditInputs} />

  )
}

export default EditPopupContainer;