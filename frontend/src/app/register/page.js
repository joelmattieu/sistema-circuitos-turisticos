"use client"
import Register from '@/views/auth/Register'
import ProtectedRoutes from '@/security/ProtectedRoutes'
import React from 'react'

const RegisterPage = () => {
  return (
    <ProtectedRoutes guestOnly>
      <Register />
    </ProtectedRoutes>
  )
}

export default RegisterPage
