'use client';
import './StatsCard.css';

export default function StatsCard({ title, value, description, buttonLabel, buttonTarget }) {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p>{value}</p>
      <p>{description}</p>
      <a href={buttonTarget} className="stats-button">{buttonLabel}</a>
    </div>
  );
} 