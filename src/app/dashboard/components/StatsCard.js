'use client';
import './StatsCard.css';

export default function StatsCard({ title, value, description, buttonLabel, buttonTarget }) {
  return (
    <div className="stats-card">
      <h3 className="stats-title">{title}</h3>
      <p className="stats-value">{value}</p>
      <p className="stats-description">{description}</p>
      <a href={buttonTarget} className="stats-button">{buttonLabel}</a>
    </div>
  );
} 