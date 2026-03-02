import React from 'react'

export default function Loading({ children, loaded }) {
  if (loaded) return children
  if (!loaded)
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
        <h1 className="text-gray-600 mt-4">Carregando...</h1>
      </div>
    )
}
