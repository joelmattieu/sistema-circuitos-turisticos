"use client"
import ProtectedRoutes from '@/security/ProtectedRoutes'
import Login from '@/views/auth/Login'
import React from 'react'

const LoginPage = () => {
  return (
    <ProtectedRoutes redirectIfLoggedIn>
    <Login />
    </ProtectedRoutes>
  )
}

export default LoginPage