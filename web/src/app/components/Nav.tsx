import '../../assets/styles/Nav.css';

interface NavProps {
  title?: string,
  children?: any, 
}

function Nav({ title, children }: NavProps) {
  return (
    <div className="nav">
      <h1 className="title">{title ?? 'Tasklify'}</h1>
      <div className="pages-block"></div>
      <div className="buttons-block">
        {children}
      </div>
    </div>
  );
}
export default Nav;