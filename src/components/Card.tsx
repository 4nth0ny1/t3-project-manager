type CardProps = {
  title: string;
  description: string;
  color: string;
};

export function Card({ title, description, color }: CardProps) {
  return (
    <div className={`card w-48 ${color} text-center text-primary-content`}>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-wrap">{description}</p>
      </div>
    </div>
  );
}
