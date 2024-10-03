import { Button } from "../ui/button";

const OutlineButton = ({ onClick, children, className }) => {
  return (
    <Button
      variant="outline"
      className={`items-center rounded-full border-2 bg-transparent px-4 py-5 !text-white hover:bg-dark-gray md:px-8 md:text-base 4xl:text-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default OutlineButton;
