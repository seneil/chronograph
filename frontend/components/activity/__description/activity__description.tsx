import b from 'bem-react-helper';

interface ActivityDescriptionProps {
  category: string;
  activity: string;
  description: string;
  isCurrent: boolean;
}

export const Activity__Description = ({ category, activity, isCurrent }: ActivityDescriptionProps) => (
  <div className={b('activity__description', {}, { current: isCurrent })}>
    <div>{activity} <i>{category}</i></div>
  </div>
)
