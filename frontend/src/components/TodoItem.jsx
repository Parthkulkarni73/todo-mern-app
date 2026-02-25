import { useState } from 'react';

const TodoItem = ({ todo, onStatusChange, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusConfig = {
    pending: {
      label: 'Pending',
      color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      next: 'in-progress'
    },
    'in-progress': {
      label: 'In Progress',
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      next: 'completed'
    },
    completed: {
      label: 'Completed',
      color: 'bg-green-500/10 text-green-500 border-green-500/20',
      next: 'pending'
    }
  };

  const currentStatus = statusConfig[todo.status];

  const handleStatusChange = async () => {
    setIsUpdating(true);
    try {
      await onStatusChange(todo._id, currentStatus.next);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo._id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors group">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <span className="text-white text-lg truncate">{todo.title}</span>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${currentStatus.color} whitespace-nowrap`}>
          {currentStatus.label}
        </span>
      </div>
      
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={handleStatusChange}
          disabled={isUpdating || isDeleting}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUpdating ? 'Updating...' : 'Change Status'}
        </button>
        
        <button
          onClick={handleDelete}
          disabled={isUpdating || isDeleting}
          className="px-4 py-2 bg-red-600/10 text-red-500 rounded-md text-sm font-medium hover:bg-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;