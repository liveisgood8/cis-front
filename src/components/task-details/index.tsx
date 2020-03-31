import * as React from 'react';
import { Card } from 'react-bootstrap';
import { ITask } from '../../stores/business-entities/types';
import { fetchSpecificTask } from '../../services/business-entities.service';
import { RouteComponentProps } from 'react-router-dom';
import { handleAxiosError } from '../../utils/axios';
import { withLoading } from '../../hoc/with-loading';
import { NotFoundedPage } from '../../pages/not-founded-page';

import './styles.css';

export const TaskDetails: React.SFC<{ task: ITask }> = ({ task }) => {
  return (
    <Card style={{ flexGrow: 1, height: 'fit-content' }}>
      <Card.Header>
        <h3>Информация о задаче</h3>
      </Card.Header>
      <Card.Body>
        <div className="bottom-splitter">
          <strong className="mr-2">Имя задачи:</strong>
          <span>{task.name}</span>
        </div>
        <div className="pt-10px">
          <strong className="mr-2">Клиент:</strong>
          <span>{task.contract.client?.name}</span>
        </div>
        <div className="bottom-splitter">
          <strong className="mr-2">Договор:</strong>
          <span>{task.contract.name}</span>
        </div>
        <div className="pt-10px">
          <strong className="mr-2">Выполнить до:</strong>
          <span>{task.doneTo.toLocaleDateString()}</span>
        </div>
        <div>
          <strong className="mr-2">Описание:</strong>
          <span>{task.description}</span>
        </div>
      </Card.Body>
    </Card>
  );
};
export const TaskDetailWithLoading = withLoading(TaskDetails);

export const TaskDetailsContainer: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const [task, setTask] = React.useState<ITask>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { id } = props.match.params;

  React.useEffect(() => {
    (async (): Promise<void> => {
      setIsLoading(true);
      try {
        const task = await fetchSpecificTask(+id);
        setTask(task);
        console.log(task, typeof task);
      } catch (err) {
        handleAxiosError(err, 'Не удалось получить информацию о задаче');
      }
      setIsLoading(false);
    })();
  }, [id]);

  return (
    <React.Fragment>
      {task ? (
        <TaskDetailWithLoading
          isLoading={isLoading}
          task={task}
        />
      ) : (
          task === undefined ?
            undefined : (
              <NotFoundedPage
                text="Задача не найдена"
              />
            )
        )}
    </React.Fragment>
  );
};
