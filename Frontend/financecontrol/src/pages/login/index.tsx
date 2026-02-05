import LoginForm from "@/components/forms/login"
import SidebarLoginLayout from '@/components/layoutlogin';

const LoginPage = () => {
  return (
    <SidebarLoginLayout>
      <div className="flex mt-[130px]">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </SidebarLoginLayout>
  )
}

export default LoginPage;