import React, { useState } from "react";
import { RegisterScreen } from "../unauthenticated-app/register";
import { LoginScreen } from "../unauthenticated-app/login";
import { Card, Divider,Button } from "antd";
import styled from "@emotion/styled";
import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Container>
      <Header></Header>
      <Background></Background>
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有帐号了，去登录" : "没有账号，注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  text-align: center;
  `

  export const LongButton = styled(Button)`
  width: 100%;
`;
  const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat; 
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-image: url(${left}), url(${right});
  `;

  const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

  const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
  `

const Container = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;
  align-items: center;
`