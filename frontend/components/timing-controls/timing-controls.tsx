import { Popover2 } from '@blueprintjs/popover2';
import { Button, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';

interface TimingControlsProps {
  timingId: number;
  onRepeat: (id: number) => Promise<void>;
}

export const TimingControls = ({ timingId, onRepeat }: TimingControlsProps) => {
  const repeatTiming = async () => (
    await onRepeat(timingId)
  );

  const timingMenu = (
    <Menu>
      <MenuItem icon='repeat' text='Продолжить' onClick={repeatTiming}/>
      <MenuDivider/>
      <MenuItem disabled={true} icon='edit' text='Изменить'/>
      <MenuItem disabled={true} icon='delete' text='Удалить'/>
    </Menu>
  );

  return (
    <Popover2
      className='timing-controls'
      placement='left-start'
      content={timingMenu}
    >
      <Button icon='more' large={false} minimal={true} title='Управление'/>
    </Popover2>
  );
};
