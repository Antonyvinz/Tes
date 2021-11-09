import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import MyLearning from './pages/mylearning/MyLearning';
import AppHeader from "./components/common/header";

const { Header, Content } = Layout;

function App() {
  return (
    <div className="app"><Layout className="mainLayout">
      {/* Header */}
      <Header className="mainHeader">
        <AppHeader />
      </Header>

      {/* Content */}
      <Content className="mainContent">
        <MyLearning />
      </Content>
    </Layout>
    </div>
  );
}

export default App;
