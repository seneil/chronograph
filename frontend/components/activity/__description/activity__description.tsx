interface ActivityDescriptionProps {
  category: string;
  activity: string;
  description: string;
}

export const Activity__Description = ({ category, activity }: ActivityDescriptionProps) => (
  <div className="activity__description">
    <p>{activity} <i>{category}</i></p>
  </div>
)
