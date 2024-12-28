import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import { Login } from "./pages/Login"
import { NotFound } from "./pages/NotFound"
import { TvRoute } from "./pages/Router/TvRoute"
import { CampaignRoute } from "./pages/Router/CampaignRoute"
import { HrRoute } from "./pages/Router/HrRoute"
import { AdminRoute } from "./pages/Router/AdminRoute"
import { TvDashboard } from "./pages/TvRoute/TvDashboard"
import { CampaignDashboard } from "./pages/CampaignRoute/CampaignDashboard"
import { HrDashboard } from "./pages/HrRoute/HrDashboard"
import { AdminDashboard } from "./pages/AdminRoute/AdminDashboard"
import { OperationAndQaRoute } from "./pages/Router/OperationAndQaRoute"
import { Accounts } from "./pages/AdminRoute/Accounts"
import { ViewUserAccount } from "./pages/AdminRoute/ViewUserAccount"
import { Urgent } from "./pages/AdminRoute/Urgent"
import { DeptAndBranch } from "./pages/AdminRoute/DeptAndBranch"
import { OperationAndQaDashboard } from "./pages/OperationAndQaRoute/OperationAndQaDashboard"
import { QARoute } from "./pages/Router/QARoute"
import { QADashboard } from "./pages/QARoute/QADashboard"

function App() {

  
  return (
    <BrowserRouter future={{
      // v7_relativeSplatPath: true,
    }}>

      <Routes path="/" element={<Layout/>}>

        <Route path="/" element={<Login/>}/>
        <Route path="*" element={<NotFound/>}/>

        {/* tv router */}
        <Route element={<TvRoute/>}>
          <Route path="/tv-dashboard" element={<TvDashboard/>}/>
        </Route>

        {/* campaign router */}
        <Route element={<CampaignRoute/>}>
          <Route path="/campaign-dashboard" element={<CampaignDashboard/>}/>
        </Route>

        {/* hr router */}
        <Route element={<HrRoute/>}>
          <Route path="/hr-dashboard" element={<HrDashboard/>}/>
        </Route>

        {/* admin router */}
        <Route element={<AdminRoute/>}>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/accounts" element={<Accounts/>}/>
          <Route path="/view-account" element={<ViewUserAccount/>}/>
          <Route path="/branch-dept" element={<DeptAndBranch/>}/>
          <Route path="/urgents" element={<Urgent/>}/>
        </Route>

        <Route element={<OperationAndQaRoute/>}>
          <Route path="/operation-dashboard" element={<OperationAndQaDashboard/>}/>
        </Route>
        <Route element={<QARoute/>}>
          <Route path="/qa-dashboard" element={<QADashboard/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
