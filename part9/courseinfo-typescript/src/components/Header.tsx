interface headerProps {
  name: string;
}

const Header = ({ name }: headerProps) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};

export default Header;
