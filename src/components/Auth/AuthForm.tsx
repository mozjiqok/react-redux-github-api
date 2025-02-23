import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "../../ui";
import { login } from "../../modules/auth/actionCreators";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

interface AuthFormInputs {
  username: string;
  token: string;
}

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector(state => state.user)

  const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
    await dispatch(login({login: data.username, token: data.token}));
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Авторизация</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Имя пользователя GitHub"
            {...register("username", {
              required: "Имя пользователя GitHub обязательно",
              pattern: {
                value: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
                message: "Некорректное имя пользователя GitHub"
              }
            })}
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <Input
            type="text"
            placeholder="GitHub токен"
            {...register("token", {
              required: "GitHub токен обязателен",
              minLength: {
                value: 20,
                message: "Токен должен быть не короче 20 символов"
              }
            })}
            className={errors.token ? "border-red-500" : ""}
          />
          {errors.token && (
            <p className="text-red-500 text-sm mt-1">
              {errors.token.message}
            </p>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}
        <Button 
          text={loading ? "Проверка..." : "Войти"} 
          type="submit" 
          disabled={loading}
        />
      </form>
    </div>
  );
}
