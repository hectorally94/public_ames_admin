// components/Alert.tsx
import React from 'react';

interface AlertProps {
  type: 'success' | 'warning' | 'error';
  title: string;
  message: string;
}

const alertStyles = {
  success: 'border-green-500 bg-green-100 text-green-800',
  warning: 'border-yellow-500 bg-yellow-100 text-yellow-800',
  error: 'border-red-500 bg-red-100 text-red-800',
};

const iconStyles = {
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

const Alert: React.FC<AlertProps> = ({ type, title, message }) => {
  const alertClass = alertStyles[type];
  const iconClass = iconStyles[type];

  const getIcon = (type: 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success':
        return (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${iconClass}`}
          >
            <path
              d="M9 16.172L4.828 12 6.243 10.585 9 13.342 17.757 4.586 19.172 6l-10.172 10.172z"
              fill="currentColor"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${iconClass}`}
          >
            <path
              d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.437 0-9.75-4.313-9.75-9.75S6.563 2.25 12 2.25 21.75 6.563 21.75 12 17.437 21.75 12 21.75zM11.25 6h1.5v6h-1.5V6zm0 8h1.5v1.5h-1.5V14z"
              fill="currentColor"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${iconClass}`}
          >
            <path
              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 16.5c-3.03 0-5.5-2.47-5.5-5.5S8.97 7.5 12 7.5 17.5 9.97 17.5 13 15.03 18.5 12 18.5zm-.25-6.75h.5v2h-.5v-2zm0-3h.5v2h-.5v-2z"
              fill="currentColor"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-start border-l-4 p-4 mb-4 ${alertClass} shadow-md dark:${alertClass}`}>
      <div className="mr-3 flex-shrink-0">
        {getIcon(type)}
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
