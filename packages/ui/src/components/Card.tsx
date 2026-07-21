import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export default function Card({ children, title }: CardProps) {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
}
