import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FocusStyleManager, Card, FormGroup, Button } from '@blueprintjs/core';

import { fetchChronography, openActivityAppendWindow } from '@frontend/controller';

import { Chronography } from '@frontend/components/chronography';
import { groupActivities } from '@frontend/utils';

import { ActivityGroup } from '@frontend/types';

const container = document.getElementById('root');
const root = createRoot(container);

FocusStyleManager.onlyShowFocusOnTabs();

const ChronographyView = () => {
  const [activities, setActivities] = useState<ActivityGroup[]>([]);

  const getChronography = async () => {
    const activityGroups = groupActivities(await fetchChronography());

    setActivities(activityGroups);
  };

  useEffect(() => {
    getChronography().catch(console.error);
  }, []);

  const createActivityAppendWindow = async () => {
    await openActivityAppendWindow();
    await getChronography();
  };

  return (
    <Card>
      <FormGroup>
        <Button
          large={true}
          icon='plus'
          onClick={createActivityAppendWindow}
        >Активность</Button>
      </FormGroup>

      <Chronography groups={activities}/>
    </Card>
  );
};

root.render(<ChronographyView/>);
