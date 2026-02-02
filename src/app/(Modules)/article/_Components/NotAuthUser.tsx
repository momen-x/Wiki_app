import React from 'react'

const NotAuthUser = ({message}:{message:string}) => {
  return (
     <div className="text-center py-8 bg-gray-50  dark:bg-gray-800  dark:border-gray-600 rounded-lg border border-dashed border-gray-300 mb-8">
          <p className="text-gray-500 dark:text-gray-200">{message}</p>
        </div>
  )
}

export default NotAuthUser