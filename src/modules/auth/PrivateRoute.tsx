'use client'

import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { useAuth } from '@/components/AuthProvider';

export const PrivateRoute = ({ children } : PropsWithChildren) => {
  const { isAuthenticated} = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');

    return null;
  }

  return children;
};
