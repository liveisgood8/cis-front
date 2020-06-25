import * as React from 'react';
import { KeyValueCard } from '../key-value-card'
import { ITask } from '../../stores/business-entities/types';
import { fetchSpecificTask } from '../../services/business-entities.service';
import { RouteComponentProps } from 'react-router-dom';
import { handleAxiosError } from '../../utils/axios';
import { withLoading } from '../../hoc/with-loading';
import { NotFoundedPage } from '../../pages/not-founded-page';

import './styles.css';

export const TaskDetails: React.SFC<{ task: ITask }> = ({ task }) => {
  return (
    <div className="flex-grow-1">
      <KeyValueCard
        title="Информация о задаче"
        values={{
          'Имя задачи': task.name,
          'sep': '---',
          'Клиент': task.contract?.client?.name as string,
          'Договор': task.contract?.name as string,
          'sep1': '---',
          'Выполнить до': task.doneTo.toLocaleDateString(),
          'Описание': task.description,
        }}
      />
    </div>
  );
};
export const TaskDetailWithLoading = withLoading(TaskDetails);

export const TaskDetailsContainer: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [task, setTask] = React.useState<ITask>();
  const [isLoading, setIsLoading] = React.useState(true);

  const { id } = props.match.params;

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const task = await fetchSpecificTask(+id);
        setTask(task);
      } catch (err) {
        handleAxiosError(err, 'Не удалось получить информацию о задаче');
      }
      setIsLoading(false);
    })();
  }, [id]);

  return (
    <React.Fragment>
      {!task && !isLoading ? (
        <NotFoundedPage
          text="Задача не найдена"
        />
      ) : (
        <TaskDetailWithLoading
          isLoading={isLoading}
          task={task as ITask}
        />
      )}
    </React.Fragment>
  );
};
