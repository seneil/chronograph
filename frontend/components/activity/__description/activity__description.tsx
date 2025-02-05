import b from 'bem-react-helper';

interface ActivityDescriptionProps {
  category: string;
  activity: string;
  description: string;
  isCurrent: boolean;
}

export const Activity__Description = ({ category, activity, description, isCurrent }: ActivityDescriptionProps) => (
  <div className={b('activity__title', {}, { current: isCurrent })}>
    <div>{activity} <i>{category}</i></div>
    {description && (
      <div className={b('activity__description')}>
        {description}
      </div>
    )}
  </div>
)
