import { Link } from 'react-router-dom';

export function Button({ children, variant = 'primary', to, href, onClick, className = '', size = 'md' }) {
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    accent: 'btn-accent',
  };

  const cls = `${variants[variant]} ${sizes[size]} ${className}`;

  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

export default Button;
