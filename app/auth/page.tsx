import './authStyle.scss';
import dynamic from 'next/dynamic';

const AuthLayout = dynamic(() => import('../../components/layout/AuthLayout/AuthLayout'))

export default function page() {
  return (
    <main className="main">
      <AuthLayout />
    </main>
  )
}