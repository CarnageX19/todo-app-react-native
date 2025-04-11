import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {

  getUserKey = (user) => `todos-${user}`;

  async getTodos(user = this.currentUser) {
    try {
      const todos = await AsyncStorage.getItem(this.getUserKey(user));
      return todos ? JSON.parse(todos) : [];
    } catch (error) {
      console.error('Failed to get todos:', error);
      throw error;
    }
  }

  async addTodo(todo, user = this.currentUser) {
    try {
      const todos = await this.getTodos(user);
      const updatedTodos = [...todos, todo];
      await AsyncStorage.setItem(this.getUserKey(user), JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Failed to add todo:', error);
      throw error;
    }
  }

  async clearTodos(user = this.currentUser) {
    try {
      await AsyncStorage.removeItem(this.getUserKey(user));
    } catch (error) {
      console.error('Failed to clear todos:', error);
      throw error;
    }
  }
}

const storageService = new StorageService();
export default storageService;
