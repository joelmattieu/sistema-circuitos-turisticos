"use client"
import Register from '@/views/auth/Register'
import React from 'react'

const RegisterPage = () => {
  return (
    <ProtectedRoutes redirectIfLoggedIn>
      <Register />
    </ProtectedRoutes>
  )
}

export default RegisterPage