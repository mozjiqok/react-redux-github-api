import AuthForm from "../components/Auth/AuthForm";

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100 p-5 box-border">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <AuthForm />
      </div>
    </div>
  );
}
