import { FC, useEffect } from "react";
import { Repository } from "../../modules/repositories/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "../../ui";
import { addRepository, editRepository } from "../../modules/repositories/actionCreators";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { setFormError } from "../../modules/repositories/repositoriesSlice";

interface RepositoryFormProps {
  initialData?: Repository | null;
  onClose: () => void;
}

export interface RepositoryFormInputs {
  name: string;
  description: string;
  private: boolean;
}

const RepositoryForm: FC<RepositoryFormProps> = ({ initialData, onClose }) => {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<RepositoryFormInputs>();
  const { formLoading, formError } = useAppSelector(state => state.repositories)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('description', initialData.description || '');
      setValue('private', initialData.private);
    }
  }, [initialData]);

  useEffect(() => {
    dispatch(setFormError(null));
  }, []);

  const onSubmit: SubmitHandler<RepositoryFormInputs> = async (data) => {
    try {
      if (initialData) {
        await dispatch(editRepository({
          name: data.name,
          description: data.description,
          private: data.private
        })).unwrap();
      }
      else {
        await dispatch(addRepository({
          name: data.name,
          description: data.description,
          private: data.private
        })).unwrap();
      }
      onClose();
    }
    catch {
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-2">Название репозитория</label>
        <Input
          type="text"
          {...register("name", {
            required: "Это поле обязательно",
            pattern: {
              value: /[a-zA-Z0-9_-]/,
              message: "Название должно состоять из латинских букв и цифр, и может содержать _ или -"
            },
            maxLength: {
              value: 100,
              message: "Максимальная длина - 100 символов"
            }
          })}
          placeholder="Название репозитория"
          className={errors.name ? "border-red-500" : ""}
          disabled={initialData ? true : false}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <label className="block mb-2">Описание (необязательно)</label>
        <Input
          type="text"
          {...register("description", {
            maxLength: {
              value: 350,
              message: 'Максимальная длина 350 символов'
            }
          })}
          placeholder="Краткое описание репозитория"
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            {...register("private")}
          />
          Приватный репозиторий
        </label>
      </div>
      {formError && (
        <p className="text-red-500 text-sm text-center">
          {formError}
        </p>
      )}
      <div className="flex justify-end space-x-2">
        <Button 
          type="submit" 
          text={formLoading ? '...' : (initialData ? 'Обновить репозиторий' : 'Создать репозиторий')}
          className="bg-blue-500 text-white"
          disabled={formLoading}
        />
      </div>
    </form>
  );
};

export default RepositoryForm;