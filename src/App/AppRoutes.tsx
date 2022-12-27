import { Routes, Route, Navigate } from 'react-router';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import TaskCreation from 'pages/Board/TaskCreation';
import Task from 'pages/Board/Task';
import Board from 'pages/Board';
import { routes } from 'utils/routes';
import ColumnCreation from 'pages/Board/ColumnCreation';
import Boards from 'pages/Boards';
import BoardCreation from 'pages/Boards/BoardCreation';

const AppRoutes = () => (
  <Routes>
    <Route path={'boards/*'} element={<Boards />}>
      <Route path="create" element={<BoardCreation />} />
    </Route>
    <Route path={`${routes.boards.byId()}/*`} element={<Board />}>
      <Route path="create" element={<ColumnCreation />} />
      <Route path="columns/:columnId/tasks/creat" element={<TaskCreation />} />
      <Route path={routes.tasks.content()} element={<Task />} />
    </Route>
    <Route path="/errorPage/*" element={<ErrorPage />} />
    <Route path="/*" element={<Navigate to="/errorPage" replace />} />
  </Routes>
);

export default AppRoutes;
