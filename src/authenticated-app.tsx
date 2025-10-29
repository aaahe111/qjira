import React, { useEffect } from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import {ReactComponent as SoftwareLogo} from "../src/assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";

export const AuthenticatedApp = () => {
  const { logout , user} = useAuth();
  return (
    <Container>
      <PageHeader/>
      <Main>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProjectListScreen />} />
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route
              path="/projects/:projectId/*"
              element={<ProjectScreen />}
            />
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button onClick={logout} type={"link"}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr ;
  height: 100vh;

`;
const Header = styled(Row)`
  padding: 0 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``