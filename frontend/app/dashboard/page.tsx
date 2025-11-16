'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import Toast from '@/components/Toast';

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskSaved = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    setRefreshTrigger(prev => prev + 1);
    showToast(editingTask ? 'Task updated successfully' : 'Task created successfully', 'success');
  };

  const handleTaskDeleted = () => {
    setRefreshTrigger(prev => prev + 1);
    showToast('Task deleted successfully', 'success');
  };

  const handleTaskToggled = () => {
    setRefreshTrigger(prev => prev + 1);
    showToast('Task status updated', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={handleCreateTask}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            + New Task
          </button>
        </div>

        <TaskList
          refreshTrigger={refreshTrigger}
          onEdit={handleEditTask}
          onDelete={handleTaskDeleted}
          onToggle={handleTaskToggled}
        />
      </main>

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <TaskForm
              task={editingTask}
              onSave={handleTaskSaved}
              onCancel={() => {
                setShowTaskForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}