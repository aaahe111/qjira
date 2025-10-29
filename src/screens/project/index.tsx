import React from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import { KanbanScreen } from "../../screens/kanban";
import { EpicScreen } from "../../screens/epic";

export const ProjectScreen = () => {
   return (
    <div>
      <h1>ProjectScreen</h1>
      <div>
        <Link to={"./kanban"}>看板</Link>
        <Link to={"./epic"}>任务组</Link>
      </div>
      <Routes>
        {/*projects/:projectId/kanban*/}
        <Route path={"kanban"} element={<KanbanScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path={"epic"} element={<EpicScreen />} />
      </Routes>
    </div>
  );
};