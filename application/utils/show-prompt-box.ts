import { dialog } from 'electron';

export const showPromptBox = async (message: string, detail = ''): Promise<boolean> => {
  const { response } = await dialog.showMessageBox({
    message,
    type: 'info',
    defaultId: 0,
    cancelId: 1,
    detail,
    buttons: ['Да', 'Отмена'],
  });

  return response === 0;
};
