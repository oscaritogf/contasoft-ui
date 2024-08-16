import React from 'react';

export default function ContasoftCard({
  title, description, users, verMas, onClick
}) {
  return (
    <div className="min-w-[275px] border border-blue-500 rounded-md bg-blue-600 text-white">
      <div className="p-4">
        <h1 className="text-sm text-white mb-2">{title}</h1>
        <p className="text-base">{description}</p>
        {users && (
          <p className="text-base">
            {users}
          </p>
        )}
      </div>
      <div className="p-4">
        <button className="text-white hover:underline text-sm" onClick={onClick}>
          {verMas}
        </button>
      </div>
    </div>
  );
}


