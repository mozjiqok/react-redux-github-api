import { useState, useEffect } from 'react';
import RepositoriesList from '../components/Repositories/RepositoriesList';
import RepositoryForm from '../components/Repositories/RepositoryForm';
import { Button, Modal } from '../ui';
import { Repository } from '../modules/repositories/types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchRepositories } from '../modules/repositories/actionCreators';

export default function RepositoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const { list, loading, error } = useAppSelector(state => state.repositories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRepositories());
  }, []);

  const openCreateModal = () => {
    setSelectedRepo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (repo: Repository) => {
    setSelectedRepo(repo);
    setIsModalOpen(true);
  };

  if (loading) return <div className="text-center mt-10">Загрузка репозиториев...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Мои репозитории</h1>
        <Button 
          text="Создать репозиторий" 
          onClick={openCreateModal} 
          className="bg-blue-500 hover:bg-blue-600"
        />
      </div>

      <RepositoriesList 
        repositories={list} 
        onSelect={openEditModal}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedRepo ? 'Редактировать репозиторий' : 'Создать репозиторий'}
      >
        <RepositoryForm 
          initialData={selectedRepo}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}