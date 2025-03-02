import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom'
import { SignIn } from './components/auth/SignIn'
import { SignUp } from './components/auth/SignUp'
import { ProtectedRoute } from './components/ProtectedRoute'
import ResearchSearch from './pages/ResearchSearch'
import ResearchReport from './pages/ResearchReport'
import Inventory from './pages/Inventory'
import Index from './pages/Index'
import Navbar from './components/Navbar'
import { useAuth } from '@/contexts/AuthContext'
import PaperDetails from './pages/PaperDetails'

export function Routes() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <RouterRoutes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/research" replace /> : <Index />} 
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/research" 
          element={
            <ProtectedRoute>
              <ResearchSearch />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/research-search" 
          element={
            <Navigate 
              to="/research" 
              replace 
              state={location.state} 
            />
          } 
        />
        <Route 
          path="/research-report" 
          element={
            <ProtectedRoute>
              <ResearchReport />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/inventory" 
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/paper-details" 
          element={
            <ProtectedRoute>
              <PaperDetails />
            </ProtectedRoute>
          } 
        />
      </RouterRoutes>
    </>
  )
} 