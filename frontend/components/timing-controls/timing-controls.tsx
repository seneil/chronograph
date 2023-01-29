import { Popover2 } from '@blueprintjs/popover2';
import { Button, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';

import { ActivityCalendarView } from '@application/types/views/activity';

interface TimingControlsProps {
  timing: ActivityCalendarView;
  onRepeat: (id: number) => Promise<void>;
  onDelete: (id: number, details: string) => Promise<void>;
}

const getTimingDetails = (timing: ActivityCalendarView) => (
  `${timing.start_time_at}-${timing.end_time_at} ${timing.activity_name}@${timing.category_name}`
);

export const TimingControls = ({ timing, onRepeat, onDelete }: TimingControlsProps) => {
  const repeatTiming = async () => (
    await onRepeat(timing.timing_id)
  );

  const deleteTiming = async () => {
    await onDelete(timing.timing_id, getTimingDetails(timing))
  };

  const timingMenu = (
    <Menu>
      <MenuItem icon='repeat' text='Продолжить' onClick={repeatTiming}/>
      <MenuDivider/>
      <MenuItem disabled={true} icon='edit' text='Изменить'/>
      <MenuItem icon='delete' text='Удалить' onClick={deleteTiming}/>
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
