import dayjs from 'dayjs';
import { useState, FormEvent, KeyboardEvent } from 'react';
import { createRoot } from 'react-dom/client';

import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { FocusStyleManager, FormGroup, InputGroup, Button } from '@blueprintjs/core';

import { Section, Section__Row, Section__Text } from '@frontend/components/section';
import { Form } from '@frontend/components/form';
import { ActivityInfo } from '@frontend/components/activity-info';
import { ButtonsGroup } from '@frontend/components/buttons-group';
import { WindowCard } from '@frontend/components/window-card';

import { closeActivityAppendWindow, fetchActivityData, postActivityInput } from '@frontend/controller/chronography';

import { ActivityData } from '@application/types';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const container = document.getElementById('root');
const view = createRoot(container);

FocusStyleManager.onlyShowFocusOnTabs();

const defaultActivityData: ActivityData = {
  activity: '',
  category: '',
  startTime: new Date(),
  endTime: null,
};

const AppendActivityView = () => {
  const [activityInput, setActivityInput] = useState<string>('');
  const [activityData, setActivityData] = useState<ActivityData>(defaultActivityData);
  const [isLoading, setLoadingStatus] = useState(false);

  const changeActivityInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    const getActivityData = async () => {
      setActivityData(await fetchActivityData(value));
    };

    getActivityData()
      // eslint-disable-next-line no-console
      .catch(console.error);

    setActivityInput(value);
  };

  const submitActivityInput = async () => {
    setLoadingStatus(true);

    await postActivityInput(activityData)
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  const closeAppendActivity = () => (
    closeActivityAppendWindow()
  );

  const downKeyActivityInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape') closeAppendActivity();
  };

  const isSubmitDisabled = !(activityData.category && activityData.activity && activityData.startTime);
  const submitButtonCaption = activityData.endTime ? 'Добавить' : 'Начать';

  return (
    <WindowCard onPressESC={closeAppendActivity}>
      <Section>
        <Form onSubmit={submitActivityInput}>
          <Section__Row>
            <FormGroup helperText="10:00-12:30 Activity Name@Category">
              <InputGroup
                leftIcon="time"
                large={true}
                autoFocus={true}
                value={activityInput}
                disabled={isLoading}
                onChange={changeActivityInput}
                onKeyDown={downKeyActivityInput}
              />
            </FormGroup>
          </Section__Row>

          <Section__Text>
            {activityInput && activityData.startTime && (
              <ActivityInfo {...activityData}/>
            )}
          </Section__Text>

          <Section__Row>
            <ButtonsGroup>
              <Button
                type="submit"
                intent="primary"
                icon="plus"
                large={true}
                loading={isLoading}
                disabled={isSubmitDisabled}
              >{submitButtonCaption}</Button>

              <Button
                type="button"
                large={true}
                loading={isLoading}
                onClick={closeAppendActivity}
              >Отмена</Button>
            </ButtonsGroup>
          </Section__Row>
        </Form>
      </Section>
    </WindowCard>
  );
}

view.render(<AppendActivityView/>);
