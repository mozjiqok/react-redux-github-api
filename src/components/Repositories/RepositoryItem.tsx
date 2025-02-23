import { FC, useState } from "react";
import { Repository } from "../../modules/repositories/types";
import { Button, Modal } from "../../ui";
import { useAppDispatch } from "../../hooks/redux";
import { removeRepository } from "../../modules/repositories/actionCreators";

interface RepositoryItemProps {
  repo: Repository;
  onSelect: () => void;
}

const RepositoryItem: FC<RepositoryItemProps> = ({ repo, onSelect }) => {

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await dispatch(removeRepository(repo.name)).unwrap();
      setIsConfirmOpen(false);
    }
    catch (error) {
      setError(error as string);
    }
  }

  const showConfirm = () => {
    setError(null);
    setIsConfirmOpen(true)
  }

  return (
    <div className="flex flex-col h-full justify-between p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {repo.name}
        </h3>
        <span 
          className={`
            px-2 py-1 rounded-full text-xs font-bold 
            ${repo.private ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
          `}
        >
          {repo.private ? 'Приватный' : 'Публичный'}
        </span>
      </div>
      
      {repo.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {repo.description}
        </p>
      )}
      
      <div className="flex space-x-2">
        <Button 
          text="Изменить" 
          onClick={onSelect}
          className="bg-blue-500 text-white text-sm px-3 py-1"
        />
        <Button 
          text="Удалить" 
          onClick={showConfirm}
          className="bg-red-500 text-white text-sm px-3 py-1"
        />
      </div>

      <Modal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)}
        title={"Подтвердите удаление " + repo.name}
      >
        {error && (
          <p className="text-red-500 text-sm mt-1 mb-4">
            {error}
          </p>
        )}
        <div className="flex space-x-2 justify-end">
          <Button 
            text="Удалить" 
            onClick={handleDelete}
            className="bg-red-500 text-white text-sm px-3 py-1"
          />
          <Button 
            text="Отмена" 
            onClick={() => setIsConfirmOpen(false)}
            className="bg-gray-500 text-white text-sm px-3 py-1"
          />
        </div>
      </Modal>
    </div>
  );
};

export default RepositoryItem;