import { FC } from "react";
import { Repository } from "../../modules/repositories/types";
import RepositoryItem from "./RepositoryItem";

interface RepositoriesListProps {
  repositories: Repository[];
  onSelect: (repo: Repository) => void;
}

const RepositoriesList: FC<RepositoriesListProps> = ({ repositories, onSelect }) => {
  if (repositories.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        У вас пока нет репозиториев
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repositories.map((repo) => (
        <div 
          key={repo.id} 
          className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <RepositoryItem 
            repo={repo} 
            onSelect={() => onSelect(repo)} 
          />
        </div>
      ))}
    </div>
  );
};

export default RepositoriesList;