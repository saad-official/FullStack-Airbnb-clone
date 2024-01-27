'use client'

interface ErrorStateProps {
    error:Error
}

import React, { useEffect } from 'react'
import EmptyState from './components/EmptyState';

const ErrorState = ({error} :ErrorStateProps) => {


    useEffect(() => {
        console.log(error)
    },[error]);

  return (
    <EmptyState
    title='Uh Oh'
    subtitle='Something Went Wrong'
    />
  )
}

export default ErrorState