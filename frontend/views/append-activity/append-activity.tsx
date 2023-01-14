import dayjs from 'dayjs';
import React, { useState, FormEvent } from 'react';
import { createRoot } from 'react-dom/client';

import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { FocusStyleManager, Card, FormGroup, InputGroup, Button } from '@blueprintjs/core';

import { Section, Section__Row, Section__Text } from '@frontend/components/section';
import { Form } from '@frontend/components/form';
import { ActivityInfo } from '@frontend/components/activity-info';

import { fetchActivityData, fetchActivityInput } from '@frontend/controller/chronography';
import { ActivityData } from '@application/types';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const container = document.getElementById('root');
const root = createRoot(container);

interface AppendActivityProps {
  title: string;
}

FocusStyleManager.onlyShowFocusOnTabs();

const defaultActivityData: ActivityData = {
  activity: '',
  category: '',
  startTime: new Date(),
  endTime: null,
};

const AppendActivityView = ({ title }: AppendActivityProps) => {
  const [activityInput, setActivityInput] = useState<string>('');
  const [activityData, setActivityData] = useState<ActivityData>(defaultActivityData);
  const [isLoading, setLoadingStatus] = useState(false);

  const changeActivityInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    const getActivityData = async () => {
      setActivityData(await fetchActivityData(value));
    };

    getActivityData()
      .catch(console.error);

    setActivityInput(value);
  }

  const submitActivityInput = async () => {
    setLoadingStatus(true);

    fetchActivityInput(activityData)
      .catch(console.error);
  }

  const isSubmitDisabled = !(activityData.category && activityData.activity && activityData.startTime);
  const submitButtonCaption = activityData.endTime ? 'Добавить' : 'Начать';

  return (
    <Card>
      <h2>{title}</h2>

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
              />
            </FormGroup>
          </Section__Row>

          <Section__Text>
            {activityInput && activityData.startTime && (
              <ActivityInfo {...activityData}/>
            )}
          </Section__Text>

          <Section__Row>
            <Button
              type="submit"
              intent="primary"
              icon="plus"
              large={true}
              loading={isLoading}
              disabled={isSubmitDisabled}
            >{submitButtonCaption}</Button>
          </Section__Row>
        </Form>
      </Section>
    </Card>
  );
}

root.render(<AppendActivityView title='Append activity'/>);
