import { Octokit } from '@octokit/rest';
import { Repository } from '../modules/repositories/types';
import { User } from '../modules/auth/types';

export default class GitHubApi {
  private octokit: Octokit | null = null;
  private user: User | null = null;

  setUser(user: User | null) {
    this.octokit = user ? new Octokit({ 
      auth: user?.token
    }) : null;
    this.user = user;
  }

  async login(): Promise<User | null> {
    if (!this.user || !this.octokit) throw new Error("Octokit not initialized");
    try {
      const { data: userInfo } = await this.octokit.users.getAuthenticated();
      if (this.user?.login.toLowerCase() !== userInfo.login.toLowerCase()) {
        throw new Error("Имя пользователя не совпадает с токеном");
      }
      return this.user;
    } catch (error) {
      console.error('Failed to get user info:', error);
      throw error;
    }
  }

  async getRepositories(): Promise<Repository[]> {
    if (!this.octokit) throw new Error("Octokit not initialized");
    try {
      const { data } = await this.octokit.repos.listForAuthenticatedUser({
        visibility: 'all',
        sort: 'updated',
        per_page: 100
      });

      return data.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || '',
        private: repo.private
      }));
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
      throw error;
    }
  }

  async createRepository(data: Pick<Repository, 'name' | 'description' | 'private'>): Promise<Repository> {
    if (!this.user || !this.octokit) throw new Error("Octokit not initialized");
    try {
      const { data: repo } = await this.octokit.repos.createForAuthenticatedUser({
        name: data.name,
        description: data.description || '',
        private: data.private
      });

      return {
        id: repo.id,
        name: repo.name,
        description: repo.description || '',
        private: repo.private
      };
    } catch (error) {
      console.error('Failed to create repository:', error);
      throw error;
    }
  }

  async updateRepository(data: Pick<Repository, 'name' | 'description' | 'private'>): Promise<Repository> {
    if (!this.user || !this.octokit) {
      throw new Error("Octokit not initialized");
    }
    try {
      const { data: result } = await this.octokit.request("PATCH /repos/{owner}/{repo}", {
        repo: data.name,
        owner: this.user.login,
        description: data.description || '',
        private: data.private
      });

      return result;
    } catch (error) {
      console.error(`Failed to update repository ${data.name}:`, error);
      throw error;
    }
  }

  async deleteRepository(repoName: string): Promise<string> {
    if (!this.user || !this.octokit) throw new Error("Octokit not initialized");
    try {
      await this.octokit.repos.delete({ 
        owner: this.user.login, 
        repo: repoName
      });
      return repoName;
    } catch (error) {
      console.error(`Failed to delete repository ${repoName}:`, error);
      throw error;
    }
  }
}
